// import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { TrackballControls } from '@react-three/drei';

export const CameraControls = () => {
  const gl = useThree((state) => state.gl);

  if (!gl || !gl.domElement) return null;

  return (
    <TrackballControls
      makeDefault
      domElement={gl.domElement}
      dynamicDampingFactor={0.05}
      minDistance={2}
      maxDistance={40}
      noPan={true}
    />
  );
};
