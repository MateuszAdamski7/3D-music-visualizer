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

    // Lighting Defaults
    keyLightIntensity: 0.8,
    fillLightColor: '#0055ff',
    fillLightIntensity: 0.4,
    rimColor: '#00ffff',
    rimPower: 3.0,
    rimIntensity: 0.8,
    specularIntensity: 0.5,
    shininess: 32.0,
    emissiveColor: '#ff0055',
    emissiveIntensity: 0.2,
    valleyEmissiveIntensity: 0.5,

    // Contour Defaults
    isContourEnabled: false,
    contourColor: '#ffffff',
    contourCount: 1.0,
    contourWidth: 0.01,
    contourIntensity: 0.25,

    // Geometry Defaults
    icosahedronRadius: 3,
    icosahedronDetail: 30,

    // Scene View Defaults
    autoRotate: false,
    wireframe: true,
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

    // Lighting Settings
    keyLightIntensity: number;
    fillLightColor: string;
    fillLightIntensity: number;
    rimColor: string;
    rimPower: number;
    rimIntensity: number;
    specularIntensity: number;
    shininess: number;
    emissiveColor: string;
    emissiveIntensity: number;
    valleyEmissiveIntensity: number;

    setKeyLightIntensity: (val: number) => void;
    setFillLightColor: (color: string) => void;
    setFillLightIntensity: (val: number) => void;
    setRimColor: (color: string) => void;
    setRimPower: (val: number) => void;
    setRimIntensity: (val: number) => void;
    setSpecularIntensity: (val: number) => void;
    setShininess: (val: number) => void;
    setEmissiveColor: (color: string) => void;
    setEmissiveIntensity: (val: number) => void;
    setValleyEmissiveIntensity: (val: number) => void;

    // Contour Settings
    isContourEnabled: boolean;
    contourColor: string;
    contourCount: number;
    contourWidth: number;
    contourIntensity: number;

    toggleContourEnabled: () => void;
    setIsContourEnabled: (enabled: boolean) => void;
    setContourColor: (color: string) => void;
    setContourCount: (count: number) => void;
    setContourWidth: (width: number) => void;
    setContourIntensity: (intensity: number) => void;

    // Geometry Settings
    icosahedronRadius: number;
    icosahedronDetail: number;
    setIcosahedronRadius: (radius: number) => void;
    setIcosahedronDetail: (detail: number) => void;

    // Scene View Settings
    autoRotate: boolean;
    wireframe: boolean;
    toggleAutoRotate: () => void;
    toggleWireframe: () => void;
    setAutoRotate: (autoRotate: boolean) => void;
    setWireframe: (wireframe: boolean) => void;

    resetPerlin: () => void;
    resetBreathing: () => void;
    resetLighting: () => void;
    resetContour: () => void;
    resetGeometry: () => void;
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

    setKeyLightIntensity: (val) => set({ keyLightIntensity: val }),
    setFillLightColor: (color) => set({ fillLightColor: color }),
    setFillLightIntensity: (val) => set({ fillLightIntensity: val }),
    setRimColor: (color) => set({ rimColor: color }),
    setRimPower: (val) => set({ rimPower: val }),
    setRimIntensity: (val) => set({ rimIntensity: val }),
    setSpecularIntensity: (val) => set({ specularIntensity: val }),
    setShininess: (val) => set({ shininess: val }),
    setEmissiveColor: (color) => set({ emissiveColor: color }),
    setEmissiveIntensity: (val) => set({ emissiveIntensity: val }),
    setValleyEmissiveIntensity: (val) => set({ valleyEmissiveIntensity: val }),

    toggleContourEnabled: () => set((state) => ({ isContourEnabled: !state.isContourEnabled })),
    setIsContourEnabled: (enabled) => set({ isContourEnabled: enabled }),
    setContourColor: (color) => set({ contourColor: color }),
    setContourCount: (count) => set({ contourCount: count }),
    setContourWidth: (width) => set({ contourWidth: width }),
    setContourIntensity: (intensity) => set({ contourIntensity: intensity }),

    setIcosahedronRadius: (radius) => set({ icosahedronRadius: radius }),
    setIcosahedronDetail: (detail) => set({ icosahedronDetail: detail }),

    toggleAutoRotate: () => set((state) => ({ autoRotate: !state.autoRotate })),
    toggleWireframe: () => set((state) => ({ wireframe: !state.wireframe })),
    setAutoRotate: (autoRotate) => set({ autoRotate }),
    setWireframe: (wireframe) => set({ wireframe }),

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
    resetLighting: () => set({
        keyLightIntensity: DEFAULT_CORE_SETTINGS.keyLightIntensity,
        fillLightColor: DEFAULT_CORE_SETTINGS.fillLightColor,
        fillLightIntensity: DEFAULT_CORE_SETTINGS.fillLightIntensity,
        rimColor: DEFAULT_CORE_SETTINGS.rimColor,
        rimPower: DEFAULT_CORE_SETTINGS.rimPower,
        rimIntensity: DEFAULT_CORE_SETTINGS.rimIntensity,
        specularIntensity: DEFAULT_CORE_SETTINGS.specularIntensity,
        shininess: DEFAULT_CORE_SETTINGS.shininess,
        emissiveColor: DEFAULT_CORE_SETTINGS.emissiveColor,
        emissiveIntensity: DEFAULT_CORE_SETTINGS.emissiveIntensity,
        valleyEmissiveIntensity: DEFAULT_CORE_SETTINGS.valleyEmissiveIntensity,
    }),
    resetContour: () => set({
        isContourEnabled: DEFAULT_CORE_SETTINGS.isContourEnabled,
        contourColor: DEFAULT_CORE_SETTINGS.contourColor,
        contourCount: DEFAULT_CORE_SETTINGS.contourCount,
        contourWidth: DEFAULT_CORE_SETTINGS.contourWidth,
        contourIntensity: DEFAULT_CORE_SETTINGS.contourIntensity,
    }),
    resetGeometry: () => set({
        icosahedronRadius: DEFAULT_CORE_SETTINGS.icosahedronRadius,
        icosahedronDetail: DEFAULT_CORE_SETTINGS.icosahedronDetail,
    }),
    resetAll: () => set({ ...DEFAULT_CORE_SETTINGS, perlinFrequencyVec: DEFAULT_CORE_SETTINGS.perlinFrequencyVec.clone() }),
}));