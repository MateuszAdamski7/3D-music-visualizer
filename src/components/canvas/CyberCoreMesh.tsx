import { useRef } from 'react';
import * as THREE from 'three';
import '../../shaders/audioSphereShader';
import { useFrame } from '@react-three/fiber'
import { useCoreStore } from '../../store/useCoreStore';

export const CyberCoreMesh = ({wireframe = true}: {wireframe: boolean}) => {

  // Typujemy ref jako dowolny obiekt (lub podajemy typ Three.ShaderMaterial)
  const materialRef = useRef<THREE.ShaderMaterial & { uTime: number, uPerlinAmplitude: number, uIsBreathing: boolean, uPerlinFrequency: number }>(null!)

  const amplitude = useCoreStore((state) => state.perlinAmplitude)
  const isBreathing = useCoreStore((state) => state.isBreathing);
  const frequency = useCoreStore((state) => state.perlinFrequency);

  useFrame((_, delta) => {
    if (materialRef.current) {
      // Opcja A: Dodawanie czasu delta (płynne, niezależne od liczby FPS)
      materialRef.current.uTime += delta;
      materialRef.current.uPerlinAmplitude = amplitude;
      materialRef.current.uIsBreathing = isBreathing;
      materialRef.current.uPerlinFrequency = frequency;
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Sub-surface Glowing Light inside the sphere */}
      {/* <pointLight ref={pointLightRef} color={themeColors.light} distance={12} decay={2} /> */}

      {/* SphereGeometry(radius 1.5, 256x256 segments) -> 65,536 vertices for ultra-high-definition smooth peak rendering */}
      <mesh>
        <icosahedronGeometry args={[1.5, 30]} />
        {/* <meshBasicMaterial color="blue" wireframe={wireframe} /> */}
        <audioSphereMaterial ref={materialRef} wireframe={wireframe} />
      </mesh>
    </group>
  );
};
