import { useMemo } from 'react';
import { useAudioStore } from '../../store/useAudioStore';

export const CyberGrid = () => {
  const theme = useAudioStore((state) => state.theme);

  const gridColor = useMemo(() => {
    switch (theme) {
      case 'synthwave':
        return '#ff00aa';
      case 'matrix':
        return '#00ff66';
      case 'cyber':
      default:
        return '#00f0ff';
    }
  }, [theme]);

  return (
    <group position={[0, -3, 0]}>
      {/* 3D Floor Grid aligned horizontally on XZ plane */}
      <gridHelper args={[60, 60, gridColor, '#7000ff']} />

      {/* Subtle floor reflection plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#030014" opacity={0.8} transparent />
      </mesh>
    </group>
  );
};
