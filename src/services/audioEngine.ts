export interface AudioData {
  bass: number;     // 0.0 to 1.0 (Low frequencies)
  mid: number;      // 0.0 to 1.0 (Mid frequencies)
  treble: number;   // 0.0 to 1.0 (High frequencies)
  rms: number;      // 0.0 to 1.0 (Root Mean Square - Overall energy)
  frequencyData: Uint8Array;
}

class AudioEngineService {
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private gainNode: GainNode | null = null;

  private audioElement: HTMLAudioElement | null = null;
  private audioSourceNode: MediaElementAudioSourceNode | null = null;
  private micStream: MediaStream | null = null;
  private micSourceNode: MediaStreamAudioSourceNode | null = null;

  private frequencyData: Uint8Array<ArrayBuffer> = new Uint8Array(256) as unknown as Uint8Array<ArrayBuffer>;
  private timeDomainData: Uint8Array<ArrayBuffer> = new Uint8Array(256) as unknown as Uint8Array<ArrayBuffer>;

  // Smoothed reactive values
  private currentBass = 0;
  private currentMid = 0;
  private currentTreble = 0;
  private currentRms = 0;

  private isInitialized = false;

  // Linear Interpolation helper for smooth transitions
  private lerp(start: number, end: number, amt: number): number {
    return (1 - amt) * start + amt * end;
  }

  public async initAudio(): Promise<boolean> {
    if (this.isInitialized && this.audioCtx && this.audioCtx.state === 'running') {
      return true;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();

      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.8;

      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.value = 0.8;

      this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
      this.timeDomainData = new Uint8Array(this.analyser.fftSize);

      if (this.audioCtx.state === 'suspended') {
        await this.audioCtx.resume();
      }

      this.isInitialized = true;
      return true;
    } catch (err) {
      console.error('Failed to initialize Web Audio API:', err);
      return false;
    }
  }

  public setVolume(volume: number) {
    if (this.gainNode) {
      this.gainNode.gain.value = Math.max(0, Math.min(1, volume));
    }
    if (this.audioElement) {
      this.audioElement.volume = Math.max(0, Math.min(1, volume));
    }
  }

  public async loadAudioFile(src: string): Promise<boolean> {
    await this.initAudio();
    this.stopCurrentSource();

    if (!this.audioCtx || !this.analyser || !this.gainNode) return false;

    this.audioElement = new Audio('demo-synthwave.wav');
    this.audioElement.crossOrigin = 'anonymous';
    this.audioElement.src = src;
    this.audioElement.loop = true;

    try {
      this.audioSourceNode = this.audioCtx.createMediaElementSource(this.audioElement);
      // Route: Source -> Analyser -> Gain -> Destination (Speakers)
      this.audioSourceNode.connect(this.analyser);
      this.analyser.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);

      return true;
    } catch (err) {
      console.error('Error connecting media element source:', err);
      return false;
    }
  }

  public async play(): Promise<void> {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }
    if (this.audioElement) {
      await this.audioElement.play();
    }
  }

  public pause(): void {
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  public async startMicrophone(): Promise<boolean> {
    await this.initAudio();
    this.stopCurrentSource();

    if (!this.audioCtx || !this.analyser) return false;

    try {
      this.micStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      this.micSourceNode = this.audioCtx.createMediaStreamSource(this.micStream);
      // Connect microphone to Analyser ONLY (not to gainNode/speakers to avoid feedback loop)
      this.micSourceNode.connect(this.analyser);

      return true;
    } catch (err) {
      console.error('Failed to access microphone stream:', err);
      return false;
    }
  }

  public stopCurrentSource() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.src = '';
      this.audioElement = null;
    }
    if (this.audioSourceNode) {
      this.audioSourceNode.disconnect();
      this.audioSourceNode = null;
    }
    if (this.micStream) {
      this.micStream.getTracks().forEach((track) => track.stop());
      this.micStream = null;
    }
    if (this.micSourceNode) {
      this.micSourceNode.disconnect();
      this.micSourceNode = null;
    }
  }

  // High performance update method called in useFrame or RAF
  public update(): AudioData {
    if (!this.analyser) {
      return {
        bass: 0,
        mid: 0,
        treble: 0,
        rms: 0,
        frequencyData: this.frequencyData,
      };
    }

    this.analyser.getByteFrequencyData(this.frequencyData);
    this.analyser.getByteTimeDomainData(this.timeDomainData);

    const binCount = this.frequencyData.length; // 256 bins

    // 1. Calculate Bass (bins 1 to 12 -> ~20Hz to 250Hz)
    let bassSum = 0;
    const bassBinCount = 12;
    for (let i = 1; i <= bassBinCount; i++) {
      bassSum += this.frequencyData[i];
    }
    const rawBass = Number.isFinite(bassSum / (bassBinCount * 255)) ? bassSum / (bassBinCount * 255) : 0;

    // 2. Calculate Mid (bins 13 to 120 -> ~250Hz to 4000Hz)
    let midSum = 0;
    const midStart = 13;
    const midEnd = 120;
    for (let i = midStart; i <= midEnd; i++) {
      midSum += this.frequencyData[i];
    }
    const rawMid = Number.isFinite(midSum / ((midEnd - midStart + 1) * 255)) ? midSum / ((midEnd - midStart + 1) * 255) : 0;

    // 3. Calculate Treble (bins 121 to 255 -> ~4000Hz to 16000Hz)
    let trebleSum = 0;
    const trebleStart = 121;
    const trebleEnd = binCount - 1;
    for (let i = trebleStart; i <= trebleEnd; i++) {
      trebleSum += this.frequencyData[i];
    }
    const rawTreble = Number.isFinite(trebleSum / ((trebleEnd - trebleStart + 1) * 255)) ? trebleSum / ((trebleEnd - trebleStart + 1) * 255) : 0;

    // 4. Calculate RMS (Volume Waveform Energy)
    let rmsSum = 0;
    for (let i = 0; i < this.timeDomainData.length; i++) {
      const normalizedSample = (this.timeDomainData[i] - 128) / 128;
      rmsSum += normalizedSample * normalizedSample;
    }
    const calculatedRms = Math.sqrt(rmsSum / this.timeDomainData.length);
    const rawRms = Number.isFinite(calculatedRms) ? calculatedRms : 0;

    // Smooth values using LERP (smoothing factor 0.25)
    this.currentBass = this.lerp(Number.isFinite(this.currentBass) ? this.currentBass : 0, rawBass, 0.25);
    this.currentMid = this.lerp(Number.isFinite(this.currentMid) ? this.currentMid : 0, rawMid, 0.25);
    this.currentTreble = this.lerp(Number.isFinite(this.currentTreble) ? this.currentTreble : 0, rawTreble, 0.25);
    this.currentRms = this.lerp(Number.isFinite(this.currentRms) ? this.currentRms : 0, rawRms, 0.25);

    return {
      bass: this.currentBass,
      mid: this.currentMid,
      treble: this.currentTreble,
      rms: this.currentRms,
      frequencyData: this.frequencyData,
    };
  }

  public cleanup() {
    this.stopCurrentSource();
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
    this.isInitialized = false;
  }
}

export const AudioEngine = new AudioEngineService();
