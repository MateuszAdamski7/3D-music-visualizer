import { EnvironmentLights } from './EnvironmentLights';
import { CyberCoreMesh } from './CyberCoreMesh';
import { CameraControls } from './CameraControls';
import { CyberGrid } from './CyberGrid';
import { Canvas } from '@react-three/fiber';
import { useCoreStore } from '../../store/useCoreStore';

export const SceneCanvas = () => {
  const wireframe = useCoreStore((state) => state.wireframe);

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
        {/* Background Color & Extended Fog */}
        <color attach="background" args={['#030014']} />
        <fog attach="fog" args={['#030014', 35, 250]} />

        {/* Camera-Locked Background Grid Wall */}
        <CyberGrid />

        {/* Scene Lighting */}
        <EnvironmentLights />

        {/* Central Deforming GLSL CyberCore Mesh */}
        <CyberCoreMesh wireframe={wireframe} />

        {/* Camera Navigation */}
        <CameraControls />
      </Canvas>
    </div>
  );
};
