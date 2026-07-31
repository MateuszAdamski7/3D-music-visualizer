import { shaderMaterial } from "@react-three/drei";
import gridVertexShader from "./gridVertex.glsl?raw";
import gridFragmentShader from "./gridFragment.glsl?raw";
import * as THREE from "three";
import { extend } from "@react-three/fiber";

export const CyberGridMaterial = shaderMaterial({
  uTime: 0,
  uColor: new THREE.Color(0xffffff),
  uSubColor: new THREE.Color(0xffffff),
  uGridSize: 40.0,
  uLineWidth: 0.035,
  uSectionEvery: 5.0,
  uOpacity: 0.55,
  uPulseSpeed: 1.8,
  uShowPulse: 1.0,
  uShowDots: 1.0,
}, gridVertexShader, gridFragmentShader);

export type CyberGridMaterialType = {
  uTime?: number;
  uColor?: THREE.Color;
  uSubColor?: THREE.Color;
  uGridSize?: number;
  uLineWidth?: number;
  uSectionEvery?: number;
  uOpacity?: number;
  uPulseSpeed?: number;
  uShowPulse?: number;
  uShowDots?: number;
  ref?: any;
  key?: React.Key;
};

extend({ CyberGridMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    cyberGridMaterial: ThreeElements['shaderMaterial'] & CyberGridMaterialType;
  }
}