import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCoreStore } from '../../store/useCoreStore';
import * as THREE from 'three';
import '../../shaders/grid/gridShader';

export const CyberGrid = () => {
  const showGrid = useCoreStore((state) => state.showGrid);
  const rimColor = useCoreStore((state) => state.rimColor);
  const groupRef = useRef<THREE.Group>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  // =========================================================================
  // 🎛️ CUSTOM GRID SHADER CONTROLS
  // =========================================================================
  const gridSize = 40.0;          // Cell density (higher = more cells)
  const lineThickness = 0.035;    // Minor line width
  const sectionEvery = 5.0;       // Major bold section lines every N cells
  const gridOpacity = 0.55;       // Base grid brightness / opacity
  const pulseSpeed = 1.8;         // Speed of expanding energy radar rings
  const showPulse = false;         // Toggle animated radar wave pulses
  const showIntersectionDots = false; // Toggle glowing dots at grid intersections
  // =========================================================================

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(rimColor || '#d6e7e8ff') },
      uSubColor: { value: new THREE.Color('#ffffff') },
      uGridSize: { value: gridSize },
      uLineWidth: { value: lineThickness },
      uSectionEvery: { value: sectionEvery },
      uOpacity: { value: gridOpacity },
      uPulseSpeed: { value: pulseSpeed },
      uShowPulse: { value: showPulse ? 1.0 : 0.0 },
      uShowDots: { value: showIntersectionDots ? 1.0 : 0.0 },
    }),
    // Re-create uniforms when tweakable props change
    [gridSize, lineThickness, sectionEvery, gridOpacity, pulseSpeed, showPulse, showIntersectionDots]
  );

  useFrame(({ camera, clock }) => {
    if (groupRef.current) {
      // Sync grid position & rotation to camera view, 20 units behind
      groupRef.current.position.copy(camera.position);
      groupRef.current.quaternion.copy(camera.quaternion);
      groupRef.current.translateZ(-20);
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uColor.value.set(rimColor || '#00f0ff');
    }
  });

  if (!showGrid) return null;

  return (
    <group ref={groupRef}>
      <mesh>
        <planeGeometry args={[100, 100]} />
        <cyberGridMaterial
          ref={materialRef}
          transparent
          depthWrite={false}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  );
};
