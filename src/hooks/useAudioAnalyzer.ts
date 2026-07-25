import { useEffect, useRef, useCallback } from 'react';
import { useAudioStore } from '../store/useAudioStore';
import { AudioEngine, type AudioData } from '../services/audioEngine';

export const useAudioAnalyzer = () => {
  const {
    sourceType,
    isPlaying,
    volume,
    sensitivity,
    setAudioMetrics,
    setIsAudioInitialized,
  } = useAudioStore();

  const rafId = useRef<number | null>(null);
  const audioDataRef = useRef<AudioData>({
    bass: 0,
    mid: 0,
    treble: 0,
    rms: 0,
    frequencyData: new Uint8Array(256),
  });

  // Fast getter for useFrame in R3F (avoids React re-renders)
  const getAudioData = useCallback(() => {
    return audioDataRef.current;
  }, []);

  // Update volume
  useEffect(() => {
    AudioEngine.setVolume(volume);
  }, [volume]);

  // Manage Audio Source (Demo track, Uploaded File, or Mic)
  useEffect(() => {
    let isCancelled = false;

    const setupSource = async () => {
      if (sourceType === 'demo') {
        const success = await AudioEngine.loadAudioFile('/audio/demo-synthwave.wav');
        if (success && !isCancelled) {
          setIsAudioInitialized(true);
          if (isPlaying) {
            await AudioEngine.play();
          }
        }
      } else if (sourceType === 'mic') {
        const success = await AudioEngine.startMicrophone();
        if (success && !isCancelled) {
          setIsAudioInitialized(true);
        }
      }
    };

    setupSource();

    return () => {
      isCancelled = true;
    };
  }, [sourceType, setIsAudioInitialized]);

  // Handle Play/Pause state
  useEffect(() => {
    if (sourceType !== 'mic') {
      if (isPlaying) {
        AudioEngine.play();
      } else {
        AudioEngine.pause();
      }
    }
  }, [isPlaying, sourceType]);

  // High performance animation loop to update store & ref
  useEffect(() => {
    let lastStoreUpdate = 0;

    const updateLoop = (timestamp: number) => {
      const data = AudioEngine.update();
      
      // Multiply metrics by sensitivity scaling factor (with NaN protection)
      const safeSens = Number.isFinite(sensitivity) ? sensitivity : 1.0;
      const rawB = Number.isFinite(data.bass) ? data.bass : 0;
      const rawM = Number.isFinite(data.mid) ? data.mid : 0;
      const rawT = Number.isFinite(data.treble) ? data.treble : 0;
      const rawR = Number.isFinite(data.rms) ? data.rms : 0;

      const scaledBass = Math.min(1.0, Math.max(0, rawB * safeSens));
      const scaledMid = Math.min(1.0, Math.max(0, rawM * safeSens));
      const scaledTreble = Math.min(1.0, Math.max(0, rawT * safeSens));
      const scaledRms = Math.min(1.0, Math.max(0, rawR * safeSens));

      audioDataRef.current = {
        bass: scaledBass,
        mid: scaledMid,
        treble: scaledTreble,
        rms: scaledRms,
        frequencyData: data.frequencyData,
      };

      // Throttle Zustand store updates to ~30 FPS for 2D UI components to preserve 60 FPS 3D canvas
      if (timestamp - lastStoreUpdate > 33) {
        setAudioMetrics(scaledBass, scaledMid, scaledTreble, scaledRms);
        lastStoreUpdate = timestamp;
      }

      rafId.current = requestAnimationFrame(updateLoop);
    };

    rafId.current = requestAnimationFrame(updateLoop);

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [sensitivity, setAudioMetrics]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      AudioEngine.cleanup();
    };
  }, []);

  const loadCustomFile = async (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    useAudioStore.getState().setTrackName(file.name);
    useAudioStore.getState().setSourceType('file');
    const success = await AudioEngine.loadAudioFile(objectUrl);
    if (success) {
      setIsAudioInitialized(true);
      useAudioStore.getState().setIsPlaying(true);
      await AudioEngine.play();
    }
  };

  return {
    getAudioData,
    loadCustomFile,
  };
};
