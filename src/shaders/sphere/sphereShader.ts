import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';
import sphereVertexShader from './sphereVertex.glsl?raw';
import sphereFragmentShader from './sphereFragment.glsl?raw';

export const SphereMaterial = shaderMaterial(
  {
    uTime: 0,
    uPerlinTime: 1.0,
    uIsPerlinEnabled: true,
    uPerlinAmplitude: 0.3,
    uPerlinFrequency: 1,
    uPerlinFrequencyVec: new THREE.Vector3(1, 1, 1),
    uIsBreathing: true,
    uBreathingSpeed: 1.0,
    uBreathingAmplitude: 0.05,
    uPerlinLacunarity: 2.0,
    uPerlinPersistence: 0.5,
    uPerlinOctaves: 6,
    uColorLow: new THREE.Color('#ff1a40'),
    uColorHigh: new THREE.Color('#00d9ff'),

    uKeyLightDir: new THREE.Vector3(1.0, 1.0, 1.0),
    uKeyLightIntensity: 0.8,

    uFillLightDir: new THREE.Vector3(-1.0, -0.5, -0.8),
    uFillLightColor: new THREE.Color('#0055ff'),
    uFillLightIntensity: 0.4,

    uRimColor: new THREE.Color('#00ffff'),
    uRimPower: 3.0,
    uRimIntensity: 0.8,

    uSpecularIntensity: 0.5,
    uShininess: 32.0,

    uEmissiveColor: new THREE.Color('#ff0055'),
    uEmissiveIntensity: 0.2,
    uValleyEmissiveIntensity: 0.5,

    uIsContourEnabled: true,
    uContourColor: new THREE.Color('#ffffff'),
    uContourCount: 12.0,
    uContourWidth: 0.15,
    uContourIntensity: 1.0,
  },
  sphereVertexShader,
  sphereFragmentShader
);

extend({ SphereMaterial });

type SphereMaterialType = {
  uTime?: number;
  uPerlinTime?: number;
  wireframe?: boolean;
  uIsPerlinEnabled?: boolean;
  uPerlinAmplitude?: number;
  uPerlinFrequency?: number;
  uPerlinFrequencyVec?: THREE.Vector3;
  uIsBreathing?: boolean;
  uBreathingSpeed?: number;
  uBreathingAmplitude?: number;
  uPerlinLacunarity?: number;
  uPerlinPersistence?: number;
  uPerlinOctaves?: number;
  uColorLow?: THREE.Color;
  uColorHigh?: THREE.Color;
  uKeyLightDir?: THREE.Vector3;
  uKeyLightIntensity?: number;
  uFillLightDir?: THREE.Vector3;
  uFillLightColor?: THREE.Color;
  uFillLightIntensity?: number;
  uRimColor?: THREE.Color;
  uRimPower?: number;
  uRimIntensity?: number;
  uSpecularIntensity?: number;
  uShininess?: number;
  uEmissiveColor?: THREE.Color;
  uEmissiveIntensity?: number;
  uValleyEmissiveIntensity?: number;
  uIsContourEnabled?: boolean;
  uContourColor?: THREE.Color;
  uContourCount?: number;
  uContourWidth?: number;
  uContourIntensity?: number;
  attach?: string;
  children?: React.ReactNode;
  ref?: any;
  key?: React.Key;
};

declare module '@react-three/fiber' {
  interface ThreeElements {
    sphereMaterial: ThreeElements['shaderMaterial'] & SphereMaterialType;
  }
}