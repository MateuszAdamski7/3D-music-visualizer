import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useCoreStore } from '../../store/useCoreStore';
import { PRESETS, type PresetConfig } from '../../constants/presets';
import { Play, Pause } from 'lucide-react';
import * as THREE from 'three';

// Helper to lerp hex colors
function lerpColor(colorA: string, colorB: string, t: number): string {
  const cA = new THREE.Color(colorA);
  const cB = new THREE.Color(colorB);
  cA.lerp(cB, t);
  return `#${cA.getHexString()}`;
}

// Helper to lerp scalar numbers
function lerpNumber(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export const PresetSelector: React.FC = () => {
  const [isTourActive, setIsTourActive] = useState(false);
  const activePresetId = useCoreStore((state) => state.activePresetId);
  const applyPresetSettings = useCoreStore((state) => state.applyPresetSettings);
  const setAutoRotate = useCoreStore((state) => state.setAutoRotate);

  const animRef = useRef<number | null>(null);

  // Transition smoothly from current store state to target preset settings over durationMs
  const transitionToPreset = useCallback(
    (targetPreset: PresetConfig, durationMs: number = 1000) => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
      }

      const currentState = useCoreStore.getState();
      const startSettings = {
        perlinAmplitude: currentState.perlinAmplitude,
        perlinFrequency: currentState.perlinFrequency,
        perlinLacunarity: currentState.perlinLacunarity,
        perlinPersistence: currentState.perlinPersistence,
        perlinOctaves: currentState.perlinOctaves,
        perlinTime: currentState.perlinTime,
        perlinColorLow: currentState.perlinColorLow,
        perlinColorHigh: currentState.perlinColorHigh,
        isBreathing: currentState.isBreathing,
        breathingSpeed: currentState.breathingSpeed,
        breathingAmplitude: currentState.breathingAmplitude,
        keyLightIntensity: currentState.keyLightIntensity,
        fillLightColor: currentState.fillLightColor,
        fillLightIntensity: currentState.fillLightIntensity,
        rimColor: currentState.rimColor,
        rimPower: currentState.rimPower,
        rimIntensity: currentState.rimIntensity,
        specularIntensity: currentState.specularIntensity,
        shininess: currentState.shininess,
        emissiveColor: currentState.emissiveColor,
        emissiveIntensity: currentState.emissiveIntensity,
        valleyEmissiveIntensity: currentState.valleyEmissiveIntensity,
        isContourEnabled: currentState.isContourEnabled,
        contourColor: currentState.contourColor,
        contourCount: currentState.contourCount,
        contourWidth: currentState.contourWidth,
        contourIntensity: currentState.contourIntensity,
        wireframe: currentState.wireframe,
      };

      const target = targetPreset.settings;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const rawProgress = Math.min(1, elapsed / durationMs);
        // Smooth step easing
        const t = rawProgress * rawProgress * (3 - 2 * rawProgress);

        const lerpedSettings = {
          perlinAmplitude: lerpNumber(startSettings.perlinAmplitude, target.perlinAmplitude, t),
          perlinFrequency: lerpNumber(startSettings.perlinFrequency, target.perlinFrequency, t),
          perlinLacunarity: lerpNumber(startSettings.perlinLacunarity, target.perlinLacunarity, t),
          perlinPersistence: lerpNumber(startSettings.perlinPersistence, target.perlinPersistence, t),
          perlinOctaves: Math.round(lerpNumber(startSettings.perlinOctaves, target.perlinOctaves, t)),
          perlinTime: lerpNumber(startSettings.perlinTime, target.perlinTime, t),
          perlinColorLow: lerpColor(startSettings.perlinColorLow, target.perlinColorLow, t),
          perlinColorHigh: lerpColor(startSettings.perlinColorHigh, target.perlinColorHigh, t),
          isBreathing: target.isBreathing,
          breathingSpeed: lerpNumber(startSettings.breathingSpeed, target.breathingSpeed, t),
          breathingAmplitude: lerpNumber(startSettings.breathingAmplitude, target.breathingAmplitude, t),
          keyLightIntensity: lerpNumber(startSettings.keyLightIntensity, target.keyLightIntensity, t),
          fillLightColor: lerpColor(startSettings.fillLightColor, target.fillLightColor, t),
          fillLightIntensity: lerpNumber(startSettings.fillLightIntensity, target.fillLightIntensity, t),
          rimColor: lerpColor(startSettings.rimColor, target.rimColor, t),
          rimPower: lerpNumber(startSettings.rimPower, target.rimPower, t),
          rimIntensity: lerpNumber(startSettings.rimIntensity, target.rimIntensity, t),
          specularIntensity: lerpNumber(startSettings.specularIntensity, target.specularIntensity, t),
          shininess: lerpNumber(startSettings.shininess, target.shininess, t),
          emissiveColor: lerpColor(startSettings.emissiveColor, target.emissiveColor, t),
          emissiveIntensity: lerpNumber(startSettings.emissiveIntensity, target.emissiveIntensity, t),
          valleyEmissiveIntensity: lerpNumber(startSettings.valleyEmissiveIntensity, target.valleyEmissiveIntensity, t),
          isContourEnabled: target.isContourEnabled,
          contourColor: lerpColor(startSettings.contourColor, target.contourColor, t),
          contourCount: lerpNumber(startSettings.contourCount, target.contourCount, t),
          contourWidth: lerpNumber(startSettings.contourWidth, target.contourWidth, t),
          contourIntensity: lerpNumber(startSettings.contourIntensity, target.contourIntensity, t),
          wireframe: target.wireframe,
        };

        applyPresetSettings(lerpedSettings, targetPreset.id);

        if (rawProgress < 1) {
          animRef.current = requestAnimationFrame(step);
        } else {
          animRef.current = null;
        }
      };

      animRef.current = requestAnimationFrame(step);
    },
    [applyPresetSettings]
  );

  const handlePresetClick = (preset: PresetConfig) => {
    if (isTourActive) {
      setIsTourActive(false);
    }
    transitionToPreset(preset, 1000);
  };

  // Auto-Tour loop
  useEffect(() => {
    if (!isTourActive) return;

    setAutoRotate(true);

    const interval = setInterval(() => {
      const currentId = useCoreStore.getState().activePresetId;
      const currentIndex = PRESETS.findIndex((p) => p.id === currentId);
      const nextIndex = (currentIndex + 1) % PRESETS.length;
      transitionToPreset(PRESETS[nextIndex], 1400);
    }, 5000);

    return () => clearInterval(interval);
  }, [isTourActive, transitionToPreset, setAutoRotate]);

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl glass-panel border border-cyan-500/20 pointer-events-auto backdrop-blur-md max-w-full overflow-x-auto scrollbar-none">
      {/* Auto Tour Toggle */}
      <button
        onClick={() => {
          const nextState = !isTourActive;
          setIsTourActive(nextState);
          if (nextState) {
            const currentId = useCoreStore.getState().activePresetId;
            const currentPreset = PRESETS.find((p) => p.id === currentId) || PRESETS[0];
            transitionToPreset(currentPreset, 1000);
          }
        }}
        className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border text-[11px] sm:text-xs font-mono font-semibold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
          isTourActive
            ? 'bg-gradient-to-r from-pink-500/30 to-purple-500/30 border-pink-400 text-pink-300 shadow-md shadow-pink-500/20 animate-pulse'
            : 'border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10'
        }`}
        title="Auto Tour: Automatically cycle presets every 5 seconds for video recording"
      >
        {isTourActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
        <span>{isTourActive ? 'PAUSE TOUR' : 'AUTO TOUR'}</span>
      </button>

      <div className="w-[1px] h-5 bg-white/10 shrink-0" />

      {/* Preset List */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        {PRESETS.map((preset) => {
          const isActive = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => handlePresetClick(preset)}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border transition-all flex items-center gap-1.5 text-[11px] sm:text-xs font-mono cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/20 font-bold scale-[1.02]'
                  : 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              title={preset.description}
            >
              <span>{preset.icon}</span>
              <span>{preset.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
