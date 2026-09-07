import { SceneCanvas } from './components/canvas/SceneCanvas';
import { Overlay } from './components/ui/Overlay';
import { CoreSettings } from './components/ui/CoreSettings';

export function App() {
  return (
    <main className="relative w-full h-[100dvh] overflow-hidden bg-[#030014]">
      {/* 3D R3F Canvas background layer */}
      <SceneCanvas />

      {/* 2D Glassmorphism Interactive UI Overlay */}
      <Overlay />

      {/* Cyberpunk Core Settings HUD */}
      <CoreSettings />
    </main>
  );
}

export default App;

