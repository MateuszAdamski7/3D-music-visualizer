import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useAudioStore } from '../../store/useAudioStore';

export const CameraControls = () => {
  const autoRotate = useAudioStore((state) => state.autoRotate);
  const gl = useThree((state) => state.gl);

  if (!gl || !gl.domElement) return null;

  return (
    <OrbitControls
      makeDefault
      domElement={gl.domElement}
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
