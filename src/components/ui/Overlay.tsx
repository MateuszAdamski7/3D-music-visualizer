import React, { useState } from 'react';
import { useAudioStore, type ColorTheme } from '../../store/useAudioStore';
import { AudioSourceSelector } from './AudioSourceSelector';
import { Play, Pause, Disc, RotateCw, Box, Radio, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface OverlayProps {
  onFileUpload: (file: File) => void;
}

export const Overlay: React.FC<OverlayProps> = ({ onFileUpload }) => {
  const [showAudioPanel, setShowAudioPanel] = useState(false);

  const {
    isPlaying,
    trackName,
    theme,
    autoRotate,
    wireframe,
    sourceType,
    setIsPlaying,
    setTheme,
    toggleAutoRotate,
    toggleWireframe,
  } = useAudioStore();

  const handleThemeChange = (newTheme: ColorTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className="relative z-10 pointer-events-none w-full h-full flex flex-col justify-between p-4 sm:p-6 select-none">
      {/* Top Header Bar */}
      <header className="flex justify-between items-center w-full">
        <div className="glass-panel px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl flex items-center gap-3 pointer-events-auto border border-cyan-500/30">
          <Disc className="w-6 h-6 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 neon-text-cyan">
              NEON CYBERVERSE
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-400 font-mono tracking-wide">3D AUDIO-REACTIVE VISUALIZER</p>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="glass-panel p-1.5 rounded-xl flex items-center gap-1 pointer-events-auto border border-white/10">
          {(['cyber', 'synthwave', 'matrix'] as ColorTheme[]).map((t) => (
            <button
              key={t}
              onClick={() => handleThemeChange(t)}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs font-mono font-medium capitalize transition-all duration-200 ${
                theme === t
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      {/* Floating Collapsible Audio Settings Panel (Top Right / Middle Right) */}
      {showAudioPanel && (
        <div className="absolute top-20 right-4 sm:right-6 pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-200">
          <AudioSourceSelector onFileUpload={onFileUpload} />
        </div>
      )}

      {/* Bottom Audio & Visual Controls */}
      <footer className="w-full flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4">
        {/* Track Status & Controls */}
        <div className="glass-panel px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl flex items-center gap-3 sm:gap-4 pointer-events-auto max-w-md w-full sm:w-auto">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400/50 flex items-center justify-center text-cyan-300 transition-all shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 shrink-0"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-cyan-300" /> : <Play className="w-5 h-5 fill-cyan-300 ml-0.5" />}
          </button>

          <div className="overflow-hidden flex-1">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-emerald-400">
                Source: {sourceType}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-white truncate max-w-[180px] sm:max-w-[240px]">
              {trackName}
            </p>
          </div>

          {/* Toggle Audio Settings Drawer */}
          <button
            onClick={() => setShowAudioPanel(!showAudioPanel)}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-mono ${
              showAudioPanel
                ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
                : 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            title="Audio Controls"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showAudioPanel ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Quick Scene Controls */}
        <div className="glass-panel p-2 rounded-2xl flex items-center gap-2 pointer-events-auto">
          <button
            onClick={toggleAutoRotate}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 text-xs font-mono ${
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
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 text-xs font-mono ${
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
