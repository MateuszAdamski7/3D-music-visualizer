import React from 'react';
import { useCoreStore } from '../../store/useCoreStore';
import { RotateCw, Box, Radio, Sparkles, Grid3x3 } from 'lucide-react';
import { PresetSelector } from './PresetSelector';

export const Overlay: React.FC = () => {
  const {
    autoRotate,
    wireframe,
    showGrid,
    toggleAutoRotate,
    toggleWireframe,
    toggleShowGrid,
  } = useCoreStore();

  return (
    <div className="fixed inset-0 z-10 pointer-events-none flex flex-col justify-between p-3 sm:p-6 select-none pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))]">
      {/* Top Header Bar */}
      <header className="flex justify-between items-center w-full">
        <div className="glass-panel px-3 py-2 sm:px-5 sm:py-3 rounded-2xl flex items-center gap-2.5 sm:gap-3 pointer-events-auto border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 animate-pulse shrink-0" />
          <div>
            <h1 className="text-sm sm:text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
              3D SPHERE PERLIN PLAYGROUND
            </h1>
            <p className="text-[9px] sm:text-xs text-gray-400 font-mono tracking-wide">INTERACTIVE GLSL NOISE LAB</p>
          </div>
        </div>
      </header>

      {/* Bottom Scene & Visual Controls */}
      <footer className="w-full flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 sm:gap-4">
        {/* Preset Bar */}
        <PresetSelector />

        {/* Quick Scene Controls */}
        <div className="glass-panel p-1.5 sm:p-2 rounded-2xl flex items-center justify-end gap-1.5 sm:gap-2 pointer-events-auto border border-cyan-500/20 backdrop-blur-md self-end shrink-0">
          <button
            onClick={toggleAutoRotate}
            className={`p-2 sm:p-2.5 rounded-xl border transition-all flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono cursor-pointer ${
              autoRotate
                ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300 shadow-md shadow-cyan-500/20'
                : 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            title="Toggle Auto Rotate"
          >
            <RotateCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '10s' }} />
            <span className="hidden sm:inline">Rotate</span>
          </button>

          <button
            onClick={toggleWireframe}
            className={`p-2 sm:p-2.5 rounded-xl border transition-all flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono cursor-pointer ${
              wireframe
                ? 'bg-purple-500/20 border-purple-400/50 text-purple-300 shadow-md shadow-purple-500/20'
                : 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            title="Toggle Wireframe Mode"
          >
            <Box className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Wireframe</span>
          </button>

          <button
            onClick={toggleShowGrid}
            className={`p-2 sm:p-2.5 rounded-xl border transition-all flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono cursor-pointer ${
              showGrid
                ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300 shadow-md shadow-cyan-500/20'
                : 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            title="Toggle Background Grid"
          >
            <Grid3x3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Grid</span>
          </button>

          <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 border border-white/10 rounded-xl text-[11px] sm:text-xs font-mono text-gray-400 flex items-center gap-1 sm:gap-1.5 bg-black/30">
            <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 animate-pulse" />
            <span>60 FPS</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

