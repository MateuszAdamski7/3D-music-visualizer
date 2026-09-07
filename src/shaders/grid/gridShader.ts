import { shaderMaterial } from "@react-three/drei";
import gridVertexShader from "./gridVertex.glsl?raw";
import gridFragmentShader from "./gridFragment.glsl?raw";
import * as THREE from "three";
import { extend } from "@react-three/fiber";

export const CyberGridMaterial = shaderMaterial(
  {
    uGridSize: 30.0,
    uLineWidth: 0.03,
    uColor: new THREE.Color('#ffffff'),
  },
  gridVertexShader,
  gridFragmentShader
);

export type CyberGridMaterialType = {
  uGridSize?: number;
  uLineWidth?: number;
  uColor?: THREE.Color;
  ref?: any;
  key?: React.Key;
};

extend({ CyberGridMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    cyberGridMaterial: ThreeElements['shaderMaterial'] & CyberGridMaterialType;
  }
}