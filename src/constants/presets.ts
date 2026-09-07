export interface PresetConfig {
  id: string;
  name: string;
  icon: string;
  description: string;
  settings: {
    perlinAmplitude: number;
    perlinFrequency: number;
    perlinLacunarity: number;
    perlinPersistence: number;
    perlinOctaves: number;
    perlinTime: number;
    perlinColorLow: string;
    perlinColorHigh: string;
    isBreathing: boolean;
    breathingSpeed: number;
    breathingAmplitude: number;
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
    isContourEnabled: boolean;
    contourColor: string;
    contourCount: number;
    contourWidth: number;
    contourIntensity: number;
    wireframe: boolean;
  };
}

export const PRESETS: PresetConfig[] = [
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    icon: '⚡',
    description: 'High contrast cyan/pink neon with glowing valleys',
    settings: {
      perlinAmplitude: 0.45,
      perlinFrequency: 1.2,
      perlinLacunarity: 2.2,
      perlinPersistence: 0.55,
      perlinOctaves: 6,
      perlinTime: 1.2,
      perlinColorLow: '#ff0055',
      perlinColorHigh: '#00f0ff',
      isBreathing: true,
      breathingSpeed: 1.2,
      breathingAmplitude: 0.08,
      keyLightIntensity: 0.9,
      fillLightColor: '#7928ca',
      fillLightIntensity: 0.5,
      rimColor: '#00ffff',
      rimPower: 2.5,
      rimIntensity: 1.0,
      specularIntensity: 0.8,
      shininess: 48.0,
      emissiveColor: '#ff0080',
      emissiveIntensity: 0.3,
      valleyEmissiveIntensity: 0.7,
      isContourEnabled: false,
      contourColor: '#ffffff',
      contourCount: 1.0,
      contourWidth: 0.01,
      contourIntensity: 0.25,
      wireframe: false,
    },
  },
  {
    id: 'liquid-gold',
    name: 'Liquid Gold',
    icon: '🪙',
    description: 'Metallic amber fluid morphing with rich specular shine',
    settings: {
      perlinAmplitude: 0.35,
      perlinFrequency: 0.8,
      perlinLacunarity: 1.8,
      perlinPersistence: 0.45,
      perlinOctaves: 4,
      perlinTime: 0.8,
      perlinColorLow: '#7a3e00',
      perlinColorHigh: '#ffb700',
      isBreathing: true,
      breathingSpeed: 0.7,
      breathingAmplitude: 0.04,
      keyLightIntensity: 1.2,
      fillLightColor: '#ff8800',
      fillLightIntensity: 0.6,
      rimColor: '#ffe600',
      rimPower: 4.0,
      rimIntensity: 0.9,
      specularIntensity: 1.0,
      shininess: 64.0,
      emissiveColor: '#ff9900',
      emissiveIntensity: 0.15,
      valleyEmissiveIntensity: 0.3,
      isContourEnabled: false,
      contourColor: '#ffffff',
      contourCount: 1.0,
      contourWidth: 0.01,
      contourIntensity: 0.25,
      wireframe: false,
    },
  },
  {
    id: 'bioluminescence',
    name: 'Biolume',
    icon: '🌌',
    description: 'Deep abyss void with glowing emerald top contours',
    settings: {
      perlinAmplitude: 0.5,
      perlinFrequency: 1.5,
      perlinLacunarity: 2.5,
      perlinPersistence: 0.6,
      perlinOctaves: 6,
      perlinTime: 0.6,
      perlinColorLow: '#002b1d',
      perlinColorHigh: '#00ffaa',
      isBreathing: true,
      breathingSpeed: 1.5,
      breathingAmplitude: 0.1,
      keyLightIntensity: 0.7,
      fillLightColor: '#004433',
      fillLightIntensity: 0.4,
      rimColor: '#00ffcc',
      rimPower: 2.0,
      rimIntensity: 1.2,
      specularIntensity: 0.6,
      shininess: 24.0,
      emissiveColor: '#00ff99',
      emissiveIntensity: 0.4,
      valleyEmissiveIntensity: 0.8,
      isContourEnabled: true,
      contourColor: '#66ffcc',
      contourCount: 12.0,
      contourWidth: 0.02,
      contourIntensity: 0.8,
      wireframe: false,
    },
  },
  {
    id: 'quantum-grid',
    name: 'Quantum Grid',
    icon: '⚛️',
    description: 'Crisp geometric wireframe with intense violet rim lighting',
    settings: {
      perlinAmplitude: 0.4,
      perlinFrequency: 2.0,
      perlinLacunarity: 2.8,
      perlinPersistence: 0.65,
      perlinOctaves: 7,
      perlinTime: 1.0,
      perlinColorLow: '#12002b',
      perlinColorHigh: '#9d00ff',
      isBreathing: false,
      breathingSpeed: 1.0,
      breathingAmplitude: 0.05,
      keyLightIntensity: 0.6,
      fillLightColor: '#5a0099',
      fillLightIntensity: 0.3,
      rimColor: '#d400ff',
      rimPower: 1.8,
      rimIntensity: 1.4,
      specularIntensity: 0.4,
      shininess: 16.0,
      emissiveColor: '#a800ff',
      emissiveIntensity: 0.2,
      valleyEmissiveIntensity: 0.4,
      isContourEnabled: false,
      contourColor: '#ffffff',
      contourCount: 1.0,
      contourWidth: 0.01,
      contourIntensity: 0.25,
      wireframe: true,
    },
  },
  {
    id: 'solar-flare',
    name: 'Solar Flare',
    icon: '☀️',
    description: 'Fiery sun plasma with violent surface turbulence',
    settings: {
      perlinAmplitude: 0.6,
      perlinFrequency: 1.1,
      perlinLacunarity: 2.0,
      perlinPersistence: 0.5,
      perlinOctaves: 5,
      perlinTime: 1.8,
      perlinColorLow: '#800000',
      perlinColorHigh: '#ff3300',
      isBreathing: true,
      breathingSpeed: 2.0,
      breathingAmplitude: 0.12,
      keyLightIntensity: 1.1,
      fillLightColor: '#ff4400',
      fillLightIntensity: 0.7,
      rimColor: '#ffcc00',
      rimPower: 2.2,
      rimIntensity: 1.1,
      specularIntensity: 0.9,
      shininess: 32.0,
      emissiveColor: '#ff2200',
      emissiveIntensity: 0.5,
      valleyEmissiveIntensity: 0.9,
      isContourEnabled: false,
      contourColor: '#ffaa00',
      contourCount: 8.0,
      contourWidth: 0.015,
      contourIntensity: 0.5,
      wireframe: false,
    },
  },
];
