import React, { useRef } from 'react';
import { useAudioStore, type AudioSourceType } from '../../store/useAudioStore';
import { Music, Mic, Upload, Volume2, Sliders } from 'lucide-react';

interface AudioSourceSelectorProps {
  onFileUpload: (file: File) => void;
}

export const AudioSourceSelector: React.FC<AudioSourceSelectorProps> = ({ onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    sourceType,
    volume,
    sensitivity,
    bass,
    mid,
    treble,
    setSourceType,
    setVolume,
    setSensitivity,
    setTrackName,
    setIsPlaying,
  } = useAudioStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleSelectSource = (type: AudioSourceType) => {
    setSourceType(type);
    if (type === 'demo') {
      setTrackName('Synthwave Cyberdrive (Demo)');
      setIsPlaying(true);
    } else if (type === 'mic') {
      setTrackName('Live Microphone Feed');
      setIsPlaying(true);
    }
  };

  return (
    <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col gap-4 w-full sm:w-80 pointer-events-auto">
      {/* Source Selector Buttons */}
      <div className="flex items-center justify-between gap-1 p-1 bg-black/30 rounded-xl">
        <button
          onClick={() => handleSelectSource('demo')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-all ${
            sourceType === 'demo'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm shadow-cyan-500/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Music className="w-3.5 h-3.5" />
          <span>Demo</span>
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-all ${
            sourceType === 'file'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-400/40 shadow-sm shadow-purple-500/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>File</span>
        </button>

        <button
          onClick={() => handleSelectSource('mic')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-all ${
            sourceType === 'mic'
              ? 'bg-pink-500/20 text-pink-300 border border-pink-400/40 shadow-sm shadow-pink-500/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
          <span>Mic</span>
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 2D Real-time Audio Spectrum Equalizer */}
      <div className="flex flex-col gap-1 bg-black/40 p-3 rounded-xl border border-white/5">
        <div className="flex justify-between items-center text-xs font-mono text-gray-400 mb-1">
          <span>AUDIO FREQUENCY BANDS</span>
          <span className="text-cyan-400 font-bold">FFT</span>
        </div>

        {/* Bass Bar */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="w-10 text-pink-400 font-medium">BASS</span>
          <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all duration-75"
              style={{ width: `${Math.min(100, bass * 100)}%` }}
            />
          </div>
          <span className="w-8 text-right text-gray-400">{(bass * 100).toFixed(0)}%</span>
        </div>

        {/* Mid Bar */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="w-10 text-purple-400 font-medium">MID</span>
          <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-75"
              style={{ width: `${Math.min(100, mid * 100)}%` }}
            />
          </div>
          <span className="w-8 text-right text-gray-400">{(mid * 100).toFixed(0)}%</span>
        </div>

        {/* Treble Bar */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="w-10 text-cyan-400 font-medium">TREB</span>
          <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-75"
              style={{ width: `${Math.min(100, treble * 100)}%` }}
            />
          </div>
          <span className="w-8 text-right text-gray-400">{(treble * 100).toFixed(0)}%</span>
        </div>
      </div>

      {/* Sliders: Volume & Sensitivity */}
      <div className="flex flex-col gap-2.5">
        {/* Volume Slider */}
        <div className="flex items-center gap-3">
          <Volume2 className="w-4 h-4 text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="flex-1 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <span className="text-xs font-mono text-gray-400 w-8 text-right">
            {(volume * 100).toFixed(0)}%
          </span>
        </div>

        {/* Sensitivity Slider */}
        <div className="flex items-center gap-3">
          <Sliders className="w-4 h-4 text-gray-400" />
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={sensitivity}
            onChange={(e) => setSensitivity(parseFloat(e.target.value))}
            className="flex-1 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-400"
          />
          <span className="text-xs font-mono text-gray-400 w-8 text-right">
            {sensitivity.toFixed(1)}x
          </span>
        </div>
      </div>
    </div>
  );
};
