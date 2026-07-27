import { useRef } from 'react';
import * as THREE from 'three';
import '../../shaders/sphereShader';
import { useFrame } from '@react-three/fiber';
import { useCoreStore } from '../../store/useCoreStore';

export const CyberCoreMesh = ({ wireframe = true }: { wireframe: boolean }) => {
  const perlinTimeRef = useRef(0);
  const breathingSpeedRef = useRef(0);

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
  }>(null!);

  useFrame((_, delta) => {
    if (materialRef.current) {
      const state = useCoreStore.getState();

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
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* SphereGeometry(radius 1.5, 256x256 segments) -> 65,536 vertices for ultra-high-definition smooth peak rendering */}
      <mesh>
        <icosahedronGeometry args={[1.5, 30]} />
        <sphereMaterial ref={materialRef} wireframe={wireframe} />
      </mesh>
    </group>
  );
};
