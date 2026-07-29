// import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
// import { useAudioStore } from '../../store/useAudioStore';
import { TrackballControls } from '@react-three/drei';

export const CameraControls = () => {
  // const autoRotate = useAudioStore((state) => state.autoRotate);
  const gl = useThree((state) => state.gl);

  if (!gl || !gl.domElement) return null;

  return (
    <TrackballControls
      makeDefault
      domElement={gl.domElement}
      // enableDamping
      // dampingFactor={0.05}
      dynamicDampingFactor={0.05}
      minDistance={0}
      maxDistance={100}
      // maxPolarAngle={Math.PI * 2} // Prevent camera from going under the grid
      // enableRotate={true}
      // autoRotate={autoRotate}
      // autoRotateSpeed={0.8}
    />
  );
};
