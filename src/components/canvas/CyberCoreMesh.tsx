import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAudioStore } from '../../store/useAudioStore';
import '../../shaders/audioSphereShader';

interface CyberCoreMeshProps {
  getAudioData: () => { bass: number; mid: number; treble: number; rms: number };
}

export const CyberCoreMesh = ({ getAudioData }: CyberCoreMeshProps) => {
  const sphereMeshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial & {
    uTime: number;
    uBass: number;
    uMid: number;
    uTreble: number;
    uColorBase: THREE.Color;
    uColorBass: THREE.Color;
    uColorMid: THREE.Color;
    uColorTreble: THREE.Color;
  }>(null!);
  const pointLightRef = useRef<THREE.PointLight>(null!);

  const theme = useAudioStore((state) => state.theme);
  const wireframe = useAudioStore((state) => state.wireframe);

  const themeColors = useMemo(() => {
    switch (theme) {
      case 'synthwave':
        return {
          base: new THREE.Color('#240038'),
          bass: new THREE.Color('#ff00aa'),   // Hot Pink
          mid: new THREE.Color('#ff8a00'),    // Sunset Orange
          treble: new THREE.Color('#00f0ff'), // Electric Cyan
          light: '#ff00aa',
        };
      case 'matrix':
        return {
          base: new THREE.Color('#011a08'),
          bass: new THREE.Color('#00ff66'),   // Matrix Green
          mid: new THREE.Color('#00aa44'),    // Darker Green
          treble: new THREE.Color('#88ffaa'), // Mint Glow
          light: '#00ff66',
        };
      case 'cyber':
      default:
        return {
          base: new THREE.Color('#080621'),
          bass: new THREE.Color('#ff007f'),   // Magenta
          mid: new THREE.Color('#7000ff'),    // Electric Violet
          treble: new THREE.Color('#00f0ff'), // Cyber Cyan
          light: '#00f0ff',
        };
    }
  }, [theme]);

  useFrame((_, delta) => {
    const audio = getAudioData();

    // Clamp audio metrics for subtle, controlled vertex displacement
    const safeBass = Math.min(1.0, Math.max(0, audio.bass || 0));
    const safeMid = Math.min(1.0, Math.max(0, audio.mid || 0));
    const safeTreble = Math.min(1.0, Math.max(0, audio.treble || 0));

    // 1. Update GLSL Shader Uniforms on GPU
    if (materialRef.current) {
      materialRef.current.uTime += delta * (0.6 + safeBass * 0.4);
      materialRef.current.uBass = safeBass;
      materialRef.current.uMid = safeMid;
      materialRef.current.uTreble = safeTreble;
      materialRef.current.uColorBase = themeColors.base;
      materialRef.current.uColorBass = themeColors.bass;
      materialRef.current.uColorMid = themeColors.mid;
      materialRef.current.uColorTreble = themeColors.treble;
    }

    // 2. Smooth, controlled sphere rotation
    if (sphereMeshRef.current) {
      sphereMeshRef.current.rotation.y += delta * (0.2 + safeBass * 0.2);
      sphereMeshRef.current.rotation.x += delta * (0.1 + safeMid * 0.1);

      const targetScale = 1.0 + safeBass * 0.12;
      sphereMeshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }

    // 3. Sub-surface point light intensity
    if (pointLightRef.current) {
      pointLightRef.current.intensity = 2.0 + safeBass * 4.0;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Sub-surface Glowing Light inside the sphere */}
      <pointLight ref={pointLightRef} color={themeColors.light} distance={12} decay={2} />

      {/* SphereGeometry(radius 1.5, 256x256 segments) -> 65,536 vertices for ultra-high-definition smooth peak rendering */}
      <mesh ref={sphereMeshRef}>
        <sphereGeometry args={[1.5, 256, 256]} />
        <audioSphereMaterial
          ref={materialRef}
          wireframe={wireframe}
          uFresnelPower={2.5}
          uColorBase={themeColors.base}
          uColorBass={themeColors.bass}
          uColorMid={themeColors.mid}
          uColorTreble={themeColors.treble}
        />
      </mesh>
    </group>
  );
};
