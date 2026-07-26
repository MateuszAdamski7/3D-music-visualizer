import { SceneCanvas } from './components/canvas/SceneCanvas';
import { Overlay } from './components/ui/Overlay';
import { CoreSettings } from './components/ui/CoreSettings';
import { useAudioAnalyzer } from './hooks/useAudioAnalyzer';

export function App() {
  const { getAudioData, loadCustomFile } = useAudioAnalyzer();

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#030014]">
      {/* 3D R3F Canvas background layer */}
      <SceneCanvas getAudioData={getAudioData} />

      {/* 2D Glassmorphism Interactive UI Overlay */}
      <Overlay onFileUpload={loadCustomFile} />

      <CoreSettings />
    </main>
  );
}

export default App;
