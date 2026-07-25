import fs from 'fs';
import path from 'path';

// Helper to write a 16-bit PCM WAV file
function createSynthwaveWavFile(outputPath, durationSeconds = 30, sampleRate = 44100) {
  const numChannels = 2; // Stereo
  const bytesPerSample = 2;
  const numSamples = durationSeconds * sampleRate;
  const dataSize = numSamples * numChannels * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  // WAV Header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20);  // AudioFormat (1 = PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * numChannels * bytesPerSample, 28);
  buffer.writeUInt16LE(numChannels * bytesPerSample, 32);
  buffer.writeUInt16LE(16, 34); // BitsPerSample
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  const bpm = 110;
  const beatSec = 60 / bpm;

  // Synthesize Cyberpunk/Synthwave Loop (Kick bass, sub-bass pulse, synth lead arpeggio, hi-hats)
  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const beatIndex = Math.floor(t / beatSec);
    const beatTime = t % beatSec;

    // 1. Heavy Synth Kick (Bass drum)
    let kick = 0;
    if (beatTime < 0.25) {
      const freq = 130 * Math.exp(-beatTime * 25);
      kick = Math.sin(2 * Math.PI * freq * beatTime) * Math.exp(-beatTime * 10) * 0.9;
    }

    // 2. Rolling Cyber Sub-Bass (8th notes, sidechained to kick)
    const subFreqs = [55, 55, 65, 49]; // A1, A1, C2, G1
    const currentSubFreq = subFreqs[Math.floor(beatIndex / 4) % subFreqs.length];
    const sidechainEnv = Math.min(1, beatTime / 0.15);
    const bassPulse = Math.sin(2 * Math.PI * currentSubFreq * t) > 0 ? 1 : -1; // Square synth bass
    const bass = bassPulse * 0.35 * sidechainEnv;

    // 3. Synthwave Arpeggio Lead (16th notes)
    const arpNotes = [220, 261.63, 329.63, 392, 440, 523.25, 659.25, 783.99]; // A C E G A C E G
    const sixteenth = (t % (beatSec / 4)) / (beatSec / 4);
    const arpIdx = Math.floor(t / (beatSec / 4)) % arpNotes.length;
    const arpFreq = arpNotes[arpIdx];
    const arpEnv = Math.exp(-sixteenth * 8);
    const synthLead = Math.sin(2 * Math.PI * arpFreq * t) * 0.25 * arpEnv;

    // 4. Hi-Hat noise burst on off-beats
    let hihat = 0;
    if (beatIndex % 1 === 0 && beatTime > beatSec * 0.45 && beatTime < beatSec * 0.55) {
      hihat = (Math.random() * 2 - 1) * Math.exp(-(beatTime - beatSec * 0.5) * 60) * 0.15;
    }

    // Mix channels
    const leftSignal = Math.max(-1, Math.min(1, kick + bass + synthLead * 0.8 + hihat));
    const rightSignal = Math.max(-1, Math.min(1, kick + bass + synthLead * 1.2 + hihat));

    const leftInt16 = Math.floor(leftSignal * 32767);
    const rightInt16 = Math.floor(rightSignal * 32767);

    buffer.writeInt16LE(leftInt16, offset);
    buffer.writeInt16LE(rightInt16, offset + 2);
    offset += 4;
  }

  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, buffer);
  console.log(`Generated demo audio file at ${outputPath}`);
}

createSynthwaveWavFile('./public/audio/demo-synthwave.wav', 30);
