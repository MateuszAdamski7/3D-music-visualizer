import { CyberCoreMesh } from './CyberCoreMesh';
import { CameraControls } from './CameraControls';
import { Canvas } from '@react-three/fiber';
import { useAudioStore } from '../../store/useAudioStore';

interface SceneCanvasProps {
  getAudioData: () => { bass: number; mid: number; treble: number; rms: number };
}

export const SceneCanvas = ({ getAudioData: _getAudioData }: SceneCanvasProps) => {

  const wireframe = useAudioStore((state) => state.wireframe);

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        dpr={[1, 2]} // Performance optimization: cap at 2x pixel ratio
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
        }}
      >
        {/* Background & Atmospheric Fog */}
        <color attach="background" args={['#030014']} />
        {/* <fog attach="fog" args={['#030014', 12, 40]} /> */}

        {/* Scene Lighting */}
        {/* <EnvironmentLights /> */}

        {/* Floor Horizon Grid */}
        {/* <CyberGrid /> */}
        <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color="red" />
        </mesh>

        {/* Central Deforming GLSL CyberCore Mesh */}
        <CyberCoreMesh wireframe={wireframe}/>

        {/* Camera Navigation */}
        <CameraControls />
      </Canvas>
    </div>
  );
};
