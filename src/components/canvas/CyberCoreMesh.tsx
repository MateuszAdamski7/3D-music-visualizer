import { useRef } from 'react';
import * as THREE from 'three';
import '../../shaders/sphereShader';
import { useFrame } from '@react-three/fiber';
import { useCoreStore } from '../../store/useCoreStore';

export const CyberCoreMesh = ({ wireframe = true }: { wireframe: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const perlinTimeRef = useRef(0);
  const breathingSpeedRef = useRef(0);

  const icosahedronRadius = useCoreStore((state) => state.icosahedronRadius);
  const icosahedronDetail = useCoreStore((state) => state.icosahedronDetail);

  const materialRef = useRef<THREE.ShaderMaterial & {
    uTime: number;
    uPerlinTime: number;
    uIsPerlinEnabled: boolean;
    uPerlinAmplitude: number;
    uIsBreathing: boolean;
    uBreathingSpeed: number;
    uBreathingAmplitude: number;
    uPerlinFrequency: number;
    uPerlinFrequencyVec: THREE.Vector3;

    uPerlinLacunarity: number;
    uPerlinPersistence: number;
    uPerlinOctaves: number;
    uColorLow: THREE.Color;
    uColorHigh: THREE.Color;

    uKeyLightIntensity: number;
    uFillLightColor: THREE.Color;
    uFillLightIntensity: number;
    uRimColor: THREE.Color;
    uRimPower: number;
    uRimIntensity: number;
    uSpecularIntensity: number;
    uShininess: number;
    uEmissiveColor: THREE.Color;
    uEmissiveIntensity: number;
    uValleyEmissiveIntensity: number;

    uIsContourEnabled: boolean;
    uContourColor: THREE.Color;
    uContourCount: number;
    uContourWidth: number;
    uContourIntensity: number;
  }>(null!);

  useFrame((_, delta) => {
    const state = useCoreStore.getState();

    if (state.autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }

    if (materialRef.current) {
      materialRef.current.uTime += delta;

      // Continuously integrate delta * speed multiplier to prevent phase jumping
      perlinTimeRef.current += delta * state.perlinTime;
      materialRef.current.uPerlinTime = perlinTimeRef.current;

      breathingSpeedRef.current += delta * 5.0 * state.breathingSpeed;
      materialRef.current.uBreathingSpeed = breathingSpeedRef.current;

      materialRef.current.uIsPerlinEnabled = state.isPerlinEnabled;
      materialRef.current.uPerlinAmplitude = state.perlinAmplitude;
      materialRef.current.uIsBreathing = state.isBreathing;
      materialRef.current.uBreathingAmplitude = state.breathingAmplitude;
      materialRef.current.uPerlinFrequency = state.perlinFrequency;
      materialRef.current.uPerlinFrequencyVec = state.perlinFrequencyVec;
      materialRef.current.uPerlinLacunarity = state.perlinLacunarity;
      materialRef.current.uPerlinPersistence = state.perlinPersistence;
      materialRef.current.uPerlinOctaves = Math.round(state.perlinOctaves);

      materialRef.current.uColorLow.set(state.perlinColorLow);
      materialRef.current.uColorHigh.set(state.perlinColorHigh);

      materialRef.current.uKeyLightIntensity = state.keyLightIntensity;
      materialRef.current.uFillLightColor.set(state.fillLightColor);
      materialRef.current.uFillLightIntensity = state.fillLightIntensity;
      materialRef.current.uRimColor.set(state.rimColor);
      materialRef.current.uRimPower = state.rimPower;
      materialRef.current.uRimIntensity = state.rimIntensity;
      materialRef.current.uSpecularIntensity = state.specularIntensity;
      materialRef.current.uShininess = state.shininess;
      materialRef.current.uEmissiveColor.set(state.emissiveColor);
      materialRef.current.uEmissiveIntensity = state.emissiveIntensity;
      materialRef.current.uValleyEmissiveIntensity = state.valleyEmissiveIntensity;

      materialRef.current.uIsContourEnabled = state.isContourEnabled;
      materialRef.current.uContourColor.set(state.contourColor);
      materialRef.current.uContourCount = state.contourCount;
      materialRef.current.uContourWidth = state.contourWidth;
      materialRef.current.uContourIntensity = state.contourIntensity;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef} scale={[icosahedronRadius, icosahedronRadius, icosahedronRadius]}>
        <icosahedronGeometry args={[1, icosahedronDetail]} />
        <sphereMaterial ref={materialRef} wireframe={wireframe} />
      </mesh>
    </group>
  );
};



