import {create} from 'zustand'

export interface CoreState {
    perlinAmplitude: number;
    perlinFrequency: number;
    perlinLacunarity: number;
    perlinPersistence: number;
    perlinOctaves: number;

    setPerlinAmplitude: (amplitude: number) => void;
    setPerlinFrequency: (frequency: number) => void;
    setPerlinLacunarity: (lacunarity: number) => void;
    setPerlinPersistence: (persistence: number) => void;
    setPerlinOctaves: (octaves: number) => void;

    isBreathing: boolean;
    toggleBreathing: () => void;
}

export const useCoreStore = create<CoreState>((set) => ({
    perlinAmplitude: 0.3,
    perlinFrequency: 1,
    perlinLacunarity: 2,
    perlinPersistence: 0.5,
    perlinOctaves: 6,
    setPerlinAmplitude: (amplitude) => set({ perlinAmplitude: amplitude }),
    setPerlinFrequency: (frequency) => set({ perlinFrequency: frequency }),
    setPerlinLacunarity: (lacunarity) => set({ perlinLacunarity: lacunarity }),
    setPerlinPersistence: (persistence) => set({ perlinPersistence: persistence }),
    setPerlinOctaves: (octaves) => set({ perlinOctaves: octaves }),
    
    isBreathing: true,
    toggleBreathing: () => set((state) => ({ isBreathing: !state.isBreathing })),
}));