import {create} from 'zustand'
import * as THREE from 'three';

export const DEFAULT_CORE_SETTINGS = {
    perlinTime: 1.0,
    isPerlinEnabled: true,
    perlinAmplitude: 0.3,
    perlinFrequency: 1,
    perlinFrequencyVec: new THREE.Vector3(1, 1, 1),
    perlinLacunarity: 2,
    perlinPersistence: 0.5,
    perlinOctaves: 6,
    perlinColorLow: '#ff1a40',
    perlinColorHigh: '#00d9ff',
    isBreathing: true,
    breathingSpeed: 1,
    breathingAmplitude: 0.05,
};

export interface CoreState {
    perlinTime: number;
    isPerlinEnabled: boolean;
    perlinAmplitude: number;
    perlinFrequency: number;
    perlinFrequencyVec: THREE.Vector3;
    perlinLacunarity: number;
    perlinPersistence: number;
    perlinOctaves: number;
    perlinColorLow: string;
    perlinColorHigh: string;

    setPerlinTime: (time: number) => void;
    setIsPerlinEnabled: (enabled: boolean) => void;
    togglePerlinEnabled: () => void;
    setPerlinAmplitude: (amplitude: number) => void;
    setPerlinFrequency: (frequency: number) => void;
    setPerlinFrequencyVec: (frequencyVec: THREE.Vector3) => void;
    setPerlinLacunarity: (lacunarity: number) => void;
    setPerlinPersistence: (persistence: number) => void;
    setPerlinOctaves: (octaves: number) => void;
    setPerlinColorLow: (color: string) => void;
    setPerlinColorHigh: (color: string) => void;

    isBreathing: boolean;
    breathingSpeed: number;
    breathingAmplitude: number;
    toggleBreathing: () => void;
    setIsBreathing: (isBreathing: boolean) => void;
    setBreathingSpeed: (speed: number) => void;
    setBreathingAmplitude: (amp: number) => void;
    resetPerlin: () => void;
    resetBreathing: () => void;
    resetAll: () => void;
}

export const useCoreStore = create<CoreState>((set) => ({
    ...DEFAULT_CORE_SETTINGS,
    setPerlinTime: (time) => set({ perlinTime: time }),
    setIsPerlinEnabled: (enabled) => set({ isPerlinEnabled: enabled }),
    togglePerlinEnabled: () => set((state) => ({ isPerlinEnabled: !state.isPerlinEnabled })),
    setPerlinAmplitude: (amplitude) => set({ perlinAmplitude: amplitude }),
    setPerlinFrequency: (frequency) => set({ perlinFrequency: frequency }),
    setPerlinFrequencyVec: (frequencyVec) => set({ perlinFrequencyVec: frequencyVec }),
    setPerlinLacunarity: (lacunarity) => set({ perlinLacunarity: lacunarity }),
    setPerlinPersistence: (persistence) => set({ perlinPersistence: persistence }),
    setPerlinOctaves: (octaves) => set({ perlinOctaves: octaves }),
    setPerlinColorLow: (color) => set({ perlinColorLow: color }),
    setPerlinColorHigh: (color) => set({ perlinColorHigh: color }),

    toggleBreathing: () => set((state) => ({ isBreathing: !state.isBreathing })),
    setBreathingSpeed: (speed) => set({ breathingSpeed: speed }),
    setBreathingAmplitude: (amp) => set({ breathingAmplitude: amp }),
    setIsBreathing: (isBreathing) => set({ isBreathing }),
    resetPerlin: () => set({
        perlinTime: DEFAULT_CORE_SETTINGS.perlinTime,
        isPerlinEnabled: DEFAULT_CORE_SETTINGS.isPerlinEnabled,
        perlinAmplitude: DEFAULT_CORE_SETTINGS.perlinAmplitude,
        perlinFrequency: DEFAULT_CORE_SETTINGS.perlinFrequency,
        perlinFrequencyVec: DEFAULT_CORE_SETTINGS.perlinFrequencyVec.clone(),
        perlinLacunarity: DEFAULT_CORE_SETTINGS.perlinLacunarity,
        perlinPersistence: DEFAULT_CORE_SETTINGS.perlinPersistence,
        perlinOctaves: DEFAULT_CORE_SETTINGS.perlinOctaves,
        perlinColorLow: DEFAULT_CORE_SETTINGS.perlinColorLow,
        perlinColorHigh: DEFAULT_CORE_SETTINGS.perlinColorHigh,
    }),
    resetBreathing: () => set({
        isBreathing: DEFAULT_CORE_SETTINGS.isBreathing,
        breathingSpeed: DEFAULT_CORE_SETTINGS.breathingSpeed,
        breathingAmplitude: DEFAULT_CORE_SETTINGS.breathingAmplitude,
    }),
    resetAll: () => set({ ...DEFAULT_CORE_SETTINGS, perlinFrequencyVec: DEFAULT_CORE_SETTINGS.perlinFrequencyVec.clone() }),
}));