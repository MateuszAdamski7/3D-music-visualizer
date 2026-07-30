import React from 'react';
import { useCoreStore } from '../../store/useCoreStore';
import { RotateCw, Box, Radio, Sparkles } from 'lucide-react';

export const Overlay: React.FC = () => {
  const {
    autoRotate,
    wireframe,
    toggleAutoRotate,
    toggleWireframe,
  } = useCoreStore();

  return (
    <div className="relative z-10 pointer-events-none w-full h-full flex flex-col justify-between p-4 sm:p-6 select-none">
      {/* Top Header Bar */}
      <header className="flex justify-between items-center w-full">
        <div className="glass-panel px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl flex items-center gap-3 pointer-events-auto border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
          <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
              3D SPHERE PERLIN PLAYGROUND
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-400 font-mono tracking-wide">INTERACTIVE GLSL NOISE LAB</p>
          </div>
        </div>
      </header>

      {/* Bottom Scene & Visual Controls */}
      <footer className="w-full flex justify-end items-center gap-4">
        {/* Quick Scene Controls */}
        <div className="glass-panel p-2 rounded-2xl flex items-center gap-2 pointer-events-auto border border-cyan-500/20 backdrop-blur-md">
          <button
            onClick={toggleAutoRotate}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 text-xs font-mono cursor-pointer ${
              autoRotate
                ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300 shadow-md shadow-cyan-500/20'
                : 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            title="Toggle Auto Rotate"
          >
            <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '10s' }} />
            <span className="hidden md:inline">Rotate</span>
          </button>

          <button
            onClick={toggleWireframe}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 text-xs font-mono cursor-pointer ${
              wireframe
                ? 'bg-purple-500/20 border-purple-400/50 text-purple-300 shadow-md shadow-purple-500/20'
                : 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            title="Toggle Wireframe Mode"
          >
            <Box className="w-4 h-4" />
            <span className="hidden md:inline">Wireframe</span>
          </button>

          <div className="px-3 py-2 border border-white/10 rounded-xl text-xs font-mono text-gray-400 flex items-center gap-1.5 bg-black/30">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>60 FPS</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

