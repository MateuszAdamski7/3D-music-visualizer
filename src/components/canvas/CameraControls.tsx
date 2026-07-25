import { OrbitControls } from '@react-three/drei';
import { useAudioStore } from '../../store/useAudioStore';

export const CameraControls = () => {
  const autoRotate = useAudioStore((state) => state.autoRotate);

  return (
    <OrbitControls
      makeDefault
      enableDamping
      dampingFactor={0.05}
      minDistance={3}
      maxDistance={25}
      maxPolarAngle={Math.PI / 2 - 0.05} // Prevent camera from going under the grid
      autoRotate={autoRotate}
      autoRotateSpeed={0.8}
    />
  );
};
