import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAudioStore } from '../../store/useAudioStore';

interface CyberCorePlaceholderProps {
  getAudioData: () => { bass: number; mid: number; treble: number; rms: number };
}

export const CyberCorePlaceholder = ({ getAudioData }: CyberCorePlaceholderProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const innerMeshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);

  const theme = useAudioStore((state) => state.theme);
  const wireframe = useAudioStore((state) => state.wireframe);

  const themeColor = theme === 'synthwave' ? '#ff00aa' : theme === 'matrix' ? '#00ff66' : '#00f0ff';

  useFrame((_, delta) => {
    const audio = getAudioData();

    // Base rotations + speedup from audio energy
    const rotationSpeed = 0.2 + audio.bass * 0.8;

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed;
      meshRef.current.rotation.y += delta * (rotationSpeed * 1.5);

      // Smooth audio scaling on bass hits
      const targetScale = 1 + audio.bass * 0.45;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
    }

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x -= delta * (rotationSpeed * 1.2);
      innerMeshRef.current.rotation.z += delta * rotationSpeed;

      const innerScale = 1 + audio.treble * 0.35;
      innerMeshRef.current.scale.lerp(new THREE.Vector3(innerScale, innerScale, innerScale), 0.15);
    }

    if (materialRef.current) {
      // Pulse emissive intensity with audio RMS & bass
      materialRef.current.emissiveIntensity = 0.5 + audio.bass * 2.0;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Wireframe Cage */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.2, 3]} />
        <meshStandardMaterial
          ref={materialRef}
          color={themeColor}
          wireframe={wireframe || true}
          emissive={themeColor}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Inner Glowing Core Sphere */}
      <mesh ref={innerMeshRef}>
        <octahedronGeometry args={[1.2, 2]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={themeColor}
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
};
