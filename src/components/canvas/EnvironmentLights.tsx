import { useMemo } from 'react';
import { useAudioStore } from '../../store/useAudioStore';

export const EnvironmentLights = () => {
  const theme = useAudioStore((state) => state.theme);

  // Theme color definitions for lights
  const themeColors = useMemo(() => {
    switch (theme) {
      case 'synthwave':
        return {
          primary: '#ff007f', // Neon Pink
          secondary: '#7928ca', // Deep Purple
          accent: '#ff8a00', // Sunset Orange
          ambient: '#1a0933',
        };
      case 'matrix':
        return {
          primary: '#00ff66', // Matrix Green
          secondary: '#008833', // Deep Green
          accent: '#88ffaa', // Mint
          ambient: '#021a0a',
        };
      case 'cyber':
      default:
        return {
          primary: '#00f0ff', // Cyber Cyan
          secondary: '#ff007f', // Cyber Pink/Magenta
          accent: '#7000ff', // Electric Violet
          ambient: '#090821',
        };
    }
  }, [theme]);

  return (
    <>
      {/* Ambient base lighting */}
      <ambientLight intensity={0.4} color={themeColors.ambient} />

      {/* Primary Key Light */}
      <pointLight
        position={[10, 15, 10]}
        intensity={2.5}
        color={themeColors.primary}
        distance={40}
        decay={2}
      />

      {/* Secondary Fill Light */}
      <pointLight
        position={[-10, -10, -10]}
        intensity={2.0}
        color={themeColors.secondary}
        distance={40}
        decay={2}
      />

      {/* Accent Rim Light */}
      <pointLight
        position={[0, 10, -15]}
        intensity={3.0}
        color={themeColors.accent}
        distance={30}
        decay={2}
      />

      {/* Subtle Directional light for depth shadows */}
      <directionalLight
        position={[5, 10, 7]}
        intensity={0.8}
        color="#ffffff"
        castShadow
      />
    </>
  );
};
