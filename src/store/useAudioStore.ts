import { create } from 'zustand';

export type AudioSourceType = 'demo' | 'file' | 'mic';
export type ColorTheme = 'cyber' | 'synthwave' | 'matrix';

export interface AudioStore {
  // Audio state
  sourceType: AudioSourceType;
  isPlaying: boolean;
  isAudioInitialized: boolean;
  volume: number;
  trackName: string;
  sensitivity: number;

  // Reactivity metrics (stored for UI / reactive triggers)
  bass: number;     // Normalized 0.0 - 1.0 (Low frequencies)
  mid: number;      // Normalized 0.0 - 1.0 (Mid frequencies)
  treble: number;   // Normalized 0.0 - 1.0 (High frequencies)
  rms: number;      // Root Mean Square (Overall energy)

  // Visual & Controls settings
  theme: ColorTheme;
  autoRotate: boolean;
  wireframe: boolean;
  bloomIntensity: number;
  particleDensity: number;
  showUI: boolean;
  fps: number;

  // Actions
  setSourceType: (source: AudioSourceType) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsAudioInitialized: (initialized: boolean) => void;
  setVolume: (volume: number) => void;
  setTrackName: (name: string) => void;
  setSensitivity: (sensitivity: number) => void;
  setAudioMetrics: (bass: number, mid: number, treble: number, rms: number) => void;
  setTheme: (theme: ColorTheme) => void;
  toggleAutoRotate: () => void;
  toggleWireframe: () => void;
  setBloomIntensity: (intensity: number) => void;
  setParticleDensity: (density: number) => void;
  toggleShowUI: () => void;
  setFps: (fps: number) => void;
}

export const useAudioStore = create<AudioStore>((set) => ({
  sourceType: 'demo',
  isPlaying: false,
  isAudioInitialized: false,
  volume: 0.8,
  trackName: 'Synthwave Cyberdrive (Demo)',
  sensitivity: 1.2,

  bass: 0,
  mid: 0,
  treble: 0,
  rms: 0,

  theme: 'cyber',
  autoRotate: true,
  wireframe: false,
  bloomIntensity: 1.5,
  particleDensity: 1000,
  showUI: true,
  fps: 60,

  setSourceType: (sourceType) => set({ sourceType }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setIsAudioInitialized: (isAudioInitialized) => set({ isAudioInitialized }),
  setVolume: (volume) => set({ volume }),
  setTrackName: (trackName) => set({ trackName }),
  setSensitivity: (sensitivity) => set({ sensitivity }),
  setAudioMetrics: (bass, mid, treble, rms) => set({ bass, mid, treble, rms }),
  setTheme: (theme) => set({ theme }),
  toggleAutoRotate: () => set((state) => ({ autoRotate: !state.autoRotate })),
  toggleWireframe: () => set((state) => ({ wireframe: !state.wireframe })),
  setBloomIntensity: (bloomIntensity) => set({ bloomIntensity }),
  setParticleDensity: (particleDensity) => set({ particleDensity }),
  toggleShowUI: () => set((state) => ({ showUI: !state.showUI })),
  setFps: (fps) => set({ fps }),
}));
