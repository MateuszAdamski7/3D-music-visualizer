import { useState, memo, useCallback, useEffect, useRef } from "react";
import { RotateCcw, SlidersHorizontal, Minimize2, Box, Sparkles, Activity, Sun, Layers, GripVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCoreStore, DEFAULT_CORE_SETTINGS } from "../../store/useCoreStore";



// --- MEMOIZED ISOLATED CONTROLS FOR MAXIMUM PERFORMANCE ---

const TimeControl = memo(() => {
    const perlinTime = useCoreStore((state) => state.perlinTime);
    const setPerlinTime = useCoreStore((state) => state.setPerlinTime);

    return (
        <div className="flex flex-col space-y-1">
            <label className="text-white font-semibold text-xs text-gray-200">Time Speed</label>
            <div className="flex items-center space-x-2">
                <input
                    type="range"
                    min={0}
                    max={3}
                    step={0.01}
                    value={perlinTime}
                    onChange={(e) => setPerlinTime(Number(e.target.value))}
                    className="w-32 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1 cursor-pointer accent-cyan-500"
                />
                <input
                    type="number"
                    step={0.01}
                    value={perlinTime}
                    onChange={(e) => setPerlinTime(Number(e.target.value))}
                    className="w-16 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                />
                <button
                    type="button"
                    onClick={() => setPerlinTime(DEFAULT_CORE_SETTINGS.perlinTime)}
                    title="Reset Time to default (1.0)"
                    className="p-1.5 text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
});

const AmplitudeControl = memo(() => {
    const amplitude = useCoreStore((state) => state.perlinAmplitude);
    const setPerlinAmplitude = useCoreStore((state) => state.setPerlinAmplitude);

    return (
        <div className="flex flex-col space-y-1">
            <label className="text-white font-semibold text-xs text-gray-200">Amplitude</label>
            <div className="flex items-center space-x-2">
                <input
                    type="range"
                    min={0}
                    max={10}
                    step={0.01}
                    value={amplitude}
                    onChange={(e) => setPerlinAmplitude(Number(e.target.value))}
                    className="w-32 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1 cursor-pointer accent-cyan-500"
                />
                <input
                    type="number"
                    step={0.01}
                    value={amplitude}
                    onChange={(e) => setPerlinAmplitude(Number(e.target.value))}
                    className="w-16 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                />
                <button
                    type="button"
                    onClick={() => setPerlinAmplitude(DEFAULT_CORE_SETTINGS.perlinAmplitude)}
                    title="Reset Amplitude to default (0.3)"
                    className="p-1.5 text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
});

const FrequencyControl = memo(() => {
    const frequency = useCoreStore((state) => state.perlinFrequency);
    const setPerlinFrequency = useCoreStore((state) => state.setPerlinFrequency);

    return (
        <div className="flex flex-col space-y-1">
            <label className="text-white font-semibold text-xs text-gray-200">Frequency</label>
            <div className="flex items-center space-x-2">
                <input
                    type="range"
                    min={0}
                    max={10}
                    step={0.01}
                    value={frequency}
                    onChange={(e) => setPerlinFrequency(Number(e.target.value))}
                    className="w-32 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1 cursor-pointer accent-cyan-500"
                />
                <input
                    type="number"
                    step={0.01}
                    value={frequency}
                    onChange={(e) => setPerlinFrequency(Number(e.target.value))}
                    className="w-16 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                />
                <button
                    type="button"
                    onClick={() => setPerlinFrequency(DEFAULT_CORE_SETTINGS.perlinFrequency)}
                    title="Reset Frequency to default (1.0)"
                    className="p-1.5 text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
});

const FrequencyVectorControl = memo(() => {
    const frequencyVec = useCoreStore((state) => state.perlinFrequencyVec);
    const setPerlinFrequencyVec = useCoreStore((state) => state.setPerlinFrequencyVec);

    const handleVecChange = useCallback((axis: 'x' | 'y' | 'z', value: number) => {
        const newVec = frequencyVec.clone();
        newVec[axis] = value;
        setPerlinFrequencyVec(newVec);
    }, [frequencyVec, setPerlinFrequencyVec]);

    return (
        <div className="flex flex-col space-y-2 border-t border-gray-700/60 pt-2">
            <div className="flex items-center justify-between">
                <label className="text-white font-semibold text-xs text-gray-200">
                    Frequency Vector (X, Y, Z)
                </label>
                <button
                    type="button"
                    onClick={() => setPerlinFrequencyVec(DEFAULT_CORE_SETTINGS.perlinFrequencyVec.clone())}
                    title="Reset entire Vector (X, Y, Z) to default (1.0, 1.0, 1.0)"
                    className="px-1.5 py-0.5 text-xs text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded transition-colors flex items-center space-x-1"
                >
                    <RotateCcw className="w-3 h-3" />
                </button>
            </div>
            {(['x', 'y', 'z'] as const).map((axis) => (
                <div key={axis} className="flex items-center space-x-2">
                    <span className="text-white text-xs font-bold w-4 uppercase">{axis}</span>
                    <input
                        type="range"
                        min={0}
                        max={10}
                        step={0.01}
                        value={frequencyVec[axis]}
                        onChange={(e) => handleVecChange(axis, Number(e.target.value))}
                        className="w-32 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1 cursor-pointer accent-cyan-500"
                    />
                    <input
                        type="number"
                        step={0.01}
                        value={frequencyVec[axis]}
                        onChange={(e) => handleVecChange(axis, Number(e.target.value))}
                        className="w-16 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                    />
                    <button
                        type="button"
                        onClick={() => handleVecChange(axis, DEFAULT_CORE_SETTINGS.perlinFrequencyVec[axis])}
                        title={`Reset Vector ${axis.toUpperCase()} to default (1.0)`}
                        className="p-1.5 text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                </div>
            ))}
        </div>
    );
});

const LacunarityControl = memo(() => {
    const lacunarity = useCoreStore((state) => state.perlinLacunarity);
    const setPerlinLacunarity = useCoreStore((state) => state.setPerlinLacunarity);

    return (
        <div className="flex flex-col space-y-1 border-t border-gray-700/60 pt-2">
            <label className="text-white font-semibold text-xs text-gray-200">Lacunarity</label>
            <div className="flex items-center space-x-2">
                <input
                    type="range"
                    min={0}
                    max={10}
                    step={0.01}
                    value={lacunarity}
                    onChange={(e) => setPerlinLacunarity(Number(e.target.value))}
                    className="w-32 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1 cursor-pointer accent-cyan-500"
                />
                <input
                    type="number"
                    step={0.01}
                    value={lacunarity}
                    onChange={(e) => setPerlinLacunarity(Number(e.target.value))}
                    className="w-16 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                />
                <button
                    type="button"
                    onClick={() => setPerlinLacunarity(DEFAULT_CORE_SETTINGS.perlinLacunarity)}
                    title="Reset Lacunarity to default (2.0)"
                    className="p-1.5 text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
});

const PersistenceControl = memo(() => {
    const persistence = useCoreStore((state) => state.perlinPersistence);
    const setPerlinPersistence = useCoreStore((state) => state.setPerlinPersistence);

    return (
        <div className="flex flex-col space-y-1">
            <label className="text-white font-semibold text-xs text-gray-200">Persistence</label>
            <div className="flex items-center space-x-2">
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={persistence}
                    onChange={(e) => setPerlinPersistence(Number(e.target.value))}
                    className="w-32 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1 cursor-pointer accent-cyan-500"
                />
                <input
                    type="number"
                    step={0.01}
                    value={persistence}
                    onChange={(e) => setPerlinPersistence(Number(e.target.value))}
                    className="w-16 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                />
                <button
                    type="button"
                    onClick={() => setPerlinPersistence(DEFAULT_CORE_SETTINGS.perlinPersistence)}
                    title="Reset Persistence to default (0.5)"
                    className="p-1.5 text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
});

const OctavesControl = memo(() => {
    const octaves = useCoreStore((state) => state.perlinOctaves);
    const setPerlinOctaves = useCoreStore((state) => state.setPerlinOctaves);

    return (
        <div className="flex flex-col space-y-1">
            <label className="text-white font-semibold text-xs text-gray-200">Octaves</label>
            <div className="flex items-center space-x-2">
                <input
                    type="range"
                    min={1}
                    max={8}
                    step={1}
                    value={octaves}
                    onChange={(e) => setPerlinOctaves(Number(e.target.value))}
                    className="w-32 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1 cursor-pointer accent-cyan-500"
                />
                <input
                    type="number"
                    step={1}
                    value={octaves}
                    onChange={(e) => setPerlinOctaves(Number(e.target.value))}
                    className="w-16 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                />
                <button
                    type="button"
                    onClick={() => setPerlinOctaves(DEFAULT_CORE_SETTINGS.perlinOctaves)}
                    title="Reset Octaves to default (6)"
                    className="p-1.5 text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
});

const ColorControl = memo(() => {
    const colorLow = useCoreStore((state) => state.perlinColorLow);
    const setPerlinColorLow = useCoreStore((state) => state.setPerlinColorLow);
    const colorHigh = useCoreStore((state) => state.perlinColorHigh);
    const setPerlinColorHigh = useCoreStore((state) => state.setPerlinColorHigh);

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-white font-semibold text-xs text-gray-200">Sphere Gradient Colors</label>
            <div className="grid grid-cols-2 gap-2">
                {/* Low Color (Valleys) */}
                <div className="flex flex-col space-y-1">
                    <span className="text-xs text-gray-400 font-medium">Valleys (Downs)</span>
                    <div className="flex items-center space-x-1 border border-gray-600 bg-gray-900 rounded-md p-1">
                        <input
                            type="color"
                            value={colorLow}
                            onChange={(e) => setPerlinColorLow(e.target.value)}
                            className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
                            title="Valley Color"
                        />
                        <input
                            type="text"
                            value={colorLow}
                            onChange={(e) => setPerlinColorLow(e.target.value)}
                            className="w-14 bg-transparent text-white text-xs font-mono uppercase focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setPerlinColorLow(DEFAULT_CORE_SETTINGS.perlinColorLow)}
                            title="Reset Valley Color"
                            className="p-1 text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                        >
                            <RotateCcw className="w-3 h-3" />
                        </button>
                    </div>
                </div>

                {/* High Color (Peaks) */}
                <div className="flex flex-col space-y-1">
                    <span className="text-xs text-gray-400 font-medium">Peaks (Tops)</span>
                    <div className="flex items-center space-x-1 border border-gray-600 bg-gray-900 rounded-md p-1">
                        <input
                            type="color"
                            value={colorHigh}
                            onChange={(e) => setPerlinColorHigh(e.target.value)}
                            className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
                            title="Peak Color"
                        />
                        <input
                            type="text"
                            value={colorHigh}
                            onChange={(e) => setPerlinColorHigh(e.target.value)}
                            className="w-14 bg-transparent text-white text-xs font-mono uppercase focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setPerlinColorHigh(DEFAULT_CORE_SETTINGS.perlinColorHigh)}
                            title="Reset Peak Color"
                            className="p-1 text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                        >
                            <RotateCcw className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

const BreathingSpeedControl = memo(() => {
    const breathingSpeed = useCoreStore((state) => state.breathingSpeed);
    const setBreathingSpeed = useCoreStore((state) => state.setBreathingSpeed);
    
    return (
        <div className="flex flex-col space-y-1">
            <label className="text-white font-semibold text-xs text-gray-200">Breathing Speed</label>
            <div className="flex items-center space-x-2">
                <input
                    type="range"
                    min={0}
                    max={3}
                    step={0.01}
                    value={breathingSpeed}
                    onChange={(e) => setBreathingSpeed(Number(e.target.value))}
                    className="w-32 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1 cursor-pointer accent-cyan-500"
                />
                <input 
                    type="number" 
                    step={0.01}
                    value={breathingSpeed} 
                    onChange={(e) => setBreathingSpeed(Number(e.target.value))} 
                    className="w-16 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                />
                <button
                    type="button"
                    onClick={() => setBreathingSpeed(DEFAULT_CORE_SETTINGS.breathingSpeed)}
                    title="Reset Breathing Speed to default (1.0)"
                    className="p-1.5 text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
});

const BreathingAmplitudeControl = memo(() => {
    const breathingAmplitude = useCoreStore((state) => state.breathingAmplitude);
    const setBreathingAmplitude = useCoreStore((state) => state.setBreathingAmplitude);
    
    return (
        <div className="flex flex-col space-y-1">
            <label className="text-white font-semibold text-xs text-gray-200">Breathing Amplitude</label>
            <div className="flex items-center space-x-2">
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.005}
                    value={breathingAmplitude}
                    onChange={(e) => setBreathingAmplitude(Number(e.target.value))}
                    className="w-32 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1 cursor-pointer accent-cyan-500"
                />
                <input 
                    type="number" 
                    step={0.005}
                    value={breathingAmplitude} 
                    onChange={(e) => setBreathingAmplitude(Number(e.target.value))} 
                    className="w-16 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                />
                <button
                    type="button"
                    onClick={() => setBreathingAmplitude(DEFAULT_CORE_SETTINGS.breathingAmplitude)}
                    title="Reset Breathing Amplitude to default (0.05)"
                    className="p-1.5 text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
});

const LightingControls = memo(() => {
    const keyLightIntensity = useCoreStore((state) => state.keyLightIntensity);
    const setKeyLightIntensity = useCoreStore((state) => state.setKeyLightIntensity);

    const fillLightColor = useCoreStore((state) => state.fillLightColor);
    const setFillLightColor = useCoreStore((state) => state.setFillLightColor);
    const fillLightIntensity = useCoreStore((state) => state.fillLightIntensity);
    const setFillLightIntensity = useCoreStore((state) => state.setFillLightIntensity);

    const rimColor = useCoreStore((state) => state.rimColor);
    const setRimColor = useCoreStore((state) => state.setRimColor);
    const rimPower = useCoreStore((state) => state.rimPower);
    const setRimPower = useCoreStore((state) => state.setRimPower);
    const rimIntensity = useCoreStore((state) => state.rimIntensity);
    const setRimIntensity = useCoreStore((state) => state.setRimIntensity);

    const specularIntensity = useCoreStore((state) => state.specularIntensity);
    const setSpecularIntensity = useCoreStore((state) => state.setSpecularIntensity);
    const shininess = useCoreStore((state) => state.shininess);
    const setShininess = useCoreStore((state) => state.setShininess);

    const emissiveColor = useCoreStore((state) => state.emissiveColor);
    const setEmissiveColor = useCoreStore((state) => state.setEmissiveColor);
    const emissiveIntensity = useCoreStore((state) => state.emissiveIntensity);
    const setEmissiveIntensity = useCoreStore((state) => state.setEmissiveIntensity);
    const valleyEmissiveIntensity = useCoreStore((state) => state.valleyEmissiveIntensity);
    const setValleyEmissiveIntensity = useCoreStore((state) => state.setValleyEmissiveIntensity);

    return (
        <div className="flex flex-col space-y-3">
            {/* Key Light */}
            <div className="flex flex-col space-y-1">
                <label className="text-white font-semibold text-xs text-cyan-300">Key Light (Main)</label>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-xs w-16">Intensity</span>
                    <input
                        type="range"
                        min={0}
                        max={2}
                        step={0.05}
                        value={keyLightIntensity}
                        onChange={(e) => setKeyLightIntensity(Number(e.target.value))}
                        className="w-24 border border-gray-600 bg-gray-900 text-white rounded-md px-1 py-1 cursor-pointer accent-cyan-500"
                    />
                    <input
                        type="number"
                        step={0.05}
                        value={keyLightIntensity}
                        onChange={(e) => setKeyLightIntensity(Number(e.target.value))}
                        className="w-14 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                    />
                </div>
            </div>

            {/* Fill Light */}
            <div className="flex flex-col space-y-1 border-t border-gray-700/60 pt-2">
                <label className="text-white font-semibold text-xs text-cyan-300">Fill Light (Shadow Tint)</label>
                <div className="flex items-center justify-between border border-gray-600 bg-gray-900 rounded-md p-1">
                    <span className="text-xs text-gray-300 ml-1">Color</span>
                    <div className="flex items-center space-x-1">
                        <input
                            type="color"
                            value={fillLightColor}
                            onChange={(e) => setFillLightColor(e.target.value)}
                            className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                        />
                        <input
                            type="text"
                            value={fillLightColor}
                            onChange={(e) => setFillLightColor(e.target.value)}
                            className="w-14 bg-transparent text-white text-xs font-mono uppercase focus:outline-none"
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-xs w-16">Intensity</span>
                    <input
                        type="range"
                        min={0}
                        max={2}
                        step={0.05}
                        value={fillLightIntensity}
                        onChange={(e) => setFillLightIntensity(Number(e.target.value))}
                        className="w-24 border border-gray-600 bg-gray-900 text-white rounded-md px-1 py-1 cursor-pointer accent-cyan-500"
                    />
                    <input
                        type="number"
                        step={0.05}
                        value={fillLightIntensity}
                        onChange={(e) => setFillLightIntensity(Number(e.target.value))}
                        className="w-14 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                    />
                </div>
            </div>

            {/* Rim Light */}
            <div className="flex flex-col space-y-1 border-t border-gray-700/60 pt-2">
                <label className="text-white font-semibold text-xs text-cyan-300">Rim Light (Fresnel Outline)</label>
                <div className="flex items-center justify-between border border-gray-600 bg-gray-900 rounded-md p-1">
                    <span className="text-xs text-gray-300 ml-1">Color</span>
                    <div className="flex items-center space-x-1">
                        <input
                            type="color"
                            value={rimColor}
                            onChange={(e) => setRimColor(e.target.value)}
                            className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                        />
                        <input
                            type="text"
                            value={rimColor}
                            onChange={(e) => setRimColor(e.target.value)}
                            className="w-14 bg-transparent text-white text-xs font-mono uppercase focus:outline-none"
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-xs w-16">Intensity</span>
                    <input
                        type="range"
                        min={0}
                        max={3}
                        step={0.05}
                        value={rimIntensity}
                        onChange={(e) => setRimIntensity(Number(e.target.value))}
                        className="w-24 border border-gray-600 bg-gray-900 text-white rounded-md px-1 py-1 cursor-pointer accent-cyan-500"
                    />
                    <input
                        type="number"
                        step={0.05}
                        value={rimIntensity}
                        onChange={(e) => setRimIntensity(Number(e.target.value))}
                        className="w-14 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-xs w-16">Power</span>
                    <input
                        type="range"
                        min={0.5}
                        max={8}
                        step={0.1}
                        value={rimPower}
                        onChange={(e) => setRimPower(Number(e.target.value))}
                        className="w-24 border border-gray-600 bg-gray-900 text-white rounded-md px-1 py-1 cursor-pointer accent-cyan-500"
                    />
                    <input
                        type="number"
                        step={0.1}
                        value={rimPower}
                        onChange={(e) => setRimPower(Number(e.target.value))}
                        className="w-14 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                    />
                </div>
            </div>

            {/* Specular */}
            <div className="flex flex-col space-y-1 border-t border-gray-700/60 pt-2">
                <label className="text-white font-semibold text-xs text-cyan-300">Specular (Gloss Highlight)</label>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-xs w-16">Intensity</span>
                    <input
                        type="range"
                        min={0}
                        max={2}
                        step={0.05}
                        value={specularIntensity}
                        onChange={(e) => setSpecularIntensity(Number(e.target.value))}
                        className="w-24 border border-gray-600 bg-gray-900 text-white rounded-md px-1 py-1 cursor-pointer accent-cyan-500"
                    />
                    <input
                        type="number"
                        step={0.05}
                        value={specularIntensity}
                        onChange={(e) => setSpecularIntensity(Number(e.target.value))}
                        className="w-14 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-xs w-16">Shininess</span>
                    <input
                        type="range"
                        min={1}
                        max={128}
                        step={1}
                        value={shininess}
                        onChange={(e) => setShininess(Number(e.target.value))}
                        className="w-24 border border-gray-600 bg-gray-900 text-white rounded-md px-1 py-1 cursor-pointer accent-cyan-500"
                    />
                    <input
                        type="number"
                        step={1}
                        value={shininess}
                        onChange={(e) => setShininess(Number(e.target.value))}
                        className="w-14 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                    />
                </div>
            </div>

            {/* Emissive */}
            <div className="flex flex-col space-y-1 border-t border-gray-700/60 pt-2">
                <label className="text-white font-semibold text-xs text-cyan-300">Emissive Light (Core & Valley Glow)</label>
                <div className="flex items-center justify-between border border-gray-600 bg-gray-900 rounded-md p-1">
                    <span className="text-xs text-gray-300 ml-1">Color</span>
                    <div className="flex items-center space-x-1">
                        <input
                            type="color"
                            value={emissiveColor}
                            onChange={(e) => setEmissiveColor(e.target.value)}
                            className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                        />
                        <input
                            type="text"
                            value={emissiveColor}
                            onChange={(e) => setEmissiveColor(e.target.value)}
                            className="w-14 bg-transparent text-white text-xs font-mono uppercase focus:outline-none"
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-xs w-16">Sphere Base</span>
                    <input
                        type="range"
                        min={0}
                        max={2}
                        step={0.05}
                        value={emissiveIntensity}
                        onChange={(e) => setEmissiveIntensity(Number(e.target.value))}
                        className="w-24 border border-gray-600 bg-gray-900 text-white rounded-md px-1 py-1 cursor-pointer accent-cyan-500"
                    />
                    <input
                        type="number"
                        step={0.05}
                        value={emissiveIntensity}
                        onChange={(e) => setEmissiveIntensity(Number(e.target.value))}
                        className="w-14 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-xs w-16">Valley Glow</span>
                    <input
                        type="range"
                        min={0}
                        max={2}
                        step={0.05}
                        value={valleyEmissiveIntensity}
                        onChange={(e) => setValleyEmissiveIntensity(Number(e.target.value))}
                        className="w-24 border border-gray-600 bg-gray-900 text-white rounded-md px-1 py-1 cursor-pointer accent-cyan-500"
                    />
                    <input
                        type="number"
                        step={0.05}
                        value={valleyEmissiveIntensity}
                        onChange={(e) => setValleyEmissiveIntensity(Number(e.target.value))}
                        className="w-14 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                    />
                </div>
            </div>
        </div>
    );
});

const ContourControls = memo(() => {
    const contourColor = useCoreStore((state) => state.contourColor);
    const setContourColor = useCoreStore((state) => state.setContourColor);
    const contourCount = useCoreStore((state) => state.contourCount);
    const setContourCount = useCoreStore((state) => state.setContourCount);
    const contourWidth = useCoreStore((state) => state.contourWidth);
    const setContourWidth = useCoreStore((state) => state.setContourWidth);
    const contourIntensity = useCoreStore((state) => state.contourIntensity);
    const setContourIntensity = useCoreStore((state) => state.setContourIntensity);

    return (
        <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between border border-gray-600 bg-gray-900 rounded-md p-1">
                <span className="text-xs text-gray-300 ml-1">Line Color</span>
                <div className="flex items-center space-x-1">
                    <input
                        type="color"
                        value={contourColor}
                        onChange={(e) => setContourColor(e.target.value)}
                        className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                    />
                    <input
                        type="text"
                        value={contourColor}
                        onChange={(e) => setContourColor(e.target.value)}
                        className="w-14 bg-transparent text-white text-xs font-mono uppercase focus:outline-none"
                    />
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-xs w-16">Count</span>
                <input
                    type="range"
                    min={1}
                    max={40}
                    step={1}
                    value={contourCount}
                    onChange={(e) => setContourCount(Number(e.target.value))}
                    className="w-24 border border-gray-600 bg-gray-900 text-white rounded-md px-1 py-1 cursor-pointer accent-cyan-500"
                />
                <input
                    type="number"
                    step={1}
                    value={contourCount}
                    onChange={(e) => setContourCount(Number(e.target.value))}
                    className="w-14 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                />
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-xs w-16">Width</span>
                <input
                    type="range"
                    min={0.01}
                    max={5}
                    step={0.01}
                    value={contourWidth}
                    onChange={(e) => setContourWidth(Number(e.target.value))}
                    className="w-24 border border-gray-600 bg-gray-900 text-white rounded-md px-1 py-1 cursor-pointer accent-cyan-500"
                />
                <input
                    type="number"
                    step={0.01}
                    value={contourWidth}
                    onChange={(e) => setContourWidth(Number(e.target.value))}
                    className="w-14 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                />
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-xs w-16">Intensity</span>
                <input
                    type="range"
                    min={0}
                    max={3}
                    step={0.05}
                    value={contourIntensity}
                    onChange={(e) => setContourIntensity(Number(e.target.value))}
                    className="w-24 border border-gray-600 bg-gray-900 text-white rounded-md px-1 py-1 cursor-pointer accent-cyan-500"
                />
                <input
                    type="number"
                    step={0.05}
                    value={contourIntensity}
                    onChange={(e) => setContourIntensity(Number(e.target.value))}
                    className="w-14 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                />
            </div>
        </div>
    );
});

const GeometryControls = memo(() => {
    const storeDetail = useCoreStore((state) => state.icosahedronDetail);
    const setStoreDetail = useCoreStore((state) => state.setIcosahedronDetail);
    const radius = useCoreStore((state) => state.icosahedronRadius);
    const setRadius = useCoreStore((state) => state.setIcosahedronRadius);

    const [localDetail, setLocalDetail] = useState(storeDetail);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Keep local detail in sync if store is reset
    useEffect(() => {
        setLocalDetail(storeDetail);
    }, [storeDetail]);

    const handleDetailSlide = (val: number) => {
        setLocalDetail(val);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            setStoreDetail(val);
        }, 50);
    };

    const handleDetailCommit = (val: number) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setStoreDetail(val);
    };

    return (
        <div className="flex flex-col space-y-3">
            <div className="flex flex-col space-y-1">
                <label className="text-white font-semibold text-xs text-cyan-300">Icosahedron Detail (Subdivisions)</label>
                <div className="flex items-center space-x-2">
                    <input
                        type="range"
                        min={0}
                        max={150}
                        step={1}
                        value={localDetail}
                        onChange={(e) => handleDetailSlide(Number(e.target.value))}
                        onPointerUp={(e) => handleDetailCommit(Number((e.target as HTMLInputElement).value))}
                        onKeyUp={(e) => handleDetailCommit(Number((e.target as HTMLInputElement).value))}
                        className="w-32 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1 cursor-pointer accent-cyan-500"
                    />
                    <input
                        type="number"
                        min={0}
                        max={200}
                        step={1}
                        value={localDetail}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            setLocalDetail(val);
                            handleDetailCommit(val);
                        }}
                        className="w-16 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                    />
                </div>
            </div>

            <div className="flex flex-col space-y-1 border-t border-gray-700/60 pt-2">
                <label className="text-white font-semibold text-xs text-cyan-300">Sphere Radius</label>
                <div className="flex items-center space-x-2">
                    <input
                        type="range"
                        min={0.5}
                        max={15}
                        step={0.1}
                        value={radius}
                        onChange={(e) => setRadius(Number(e.target.value))}
                        className="w-32 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1 cursor-pointer accent-cyan-500"
                    />
                    <input
                        type="number"
                        step={0.1}
                        value={radius}
                        onChange={(e) => setRadius(Number(e.target.value))}
                        className="w-16 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                    />
                </div>
            </div>
        </div>
    );
});


type TabType = 'mesh' | 'perlin' | 'breathing' | 'lighting' | 'contours';

export const CoreSettings = () => {
    const [activeTab, setActiveTab] = useState<TabType>('perlin');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [position, setPosition] = useState({ x: 16, y: 96 }); // top-24 (96px), left-4 (16px)
    const [menuSize, setMenuSize] = useState({ width: 340, height: 460 });

    const isPerlinEnabled = useCoreStore((state) => state.isPerlinEnabled);
    const togglePerlinEnabled = useCoreStore((state) => state.togglePerlinEnabled);
    const isBreathing = useCoreStore((state) => state.isBreathing);
    const toggleBreathing = useCoreStore((state) => state.toggleBreathing);
    const isContourEnabled = useCoreStore((state) => state.isContourEnabled);
    const toggleContourEnabled = useCoreStore((state) => state.toggleContourEnabled);

    const resetPerlin = useCoreStore((state) => state.resetPerlin);
    const resetBreathing = useCoreStore((state) => state.resetBreathing);
    const resetLighting = useCoreStore((state) => state.resetLighting);
    const resetContour = useCoreStore((state) => state.resetContour);
    const resetGeometry = useCoreStore((state) => state.resetGeometry);
    const resetAll = useCoreStore((state) => state.resetAll);

    const handleCategoryReset = () => {
        switch (activeTab) {
            case 'mesh': resetGeometry(); break;
            case 'perlin': resetPerlin(); break;
            case 'breathing': resetBreathing(); break;
            case 'lighting': resetLighting(); break;
            case 'contours': resetContour(); break;
        }
    };

    const handleMovePointerDown = (e: React.PointerEvent) => {
        if (e.button !== 0) return;
        e.preventDefault();
        const startX = e.clientX;
        const startY = e.clientY;
        const startPosX = position.x;
        const startPosY = position.y;

        const onPointerMove = (moveEvent: PointerEvent) => {
            const newX = Math.max(0, Math.min(window.innerWidth - 100, startPosX + (moveEvent.clientX - startX)));
            const newY = Math.max(0, Math.min(window.innerHeight - 50, startPosY + (moveEvent.clientY - startY)));
            setPosition({ x: newX, y: newY });
        };

        const onPointerUp = () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
        };

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
    };

    const handleResizePointerDown = (e: React.PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = menuSize.width;
        const startHeight = menuSize.height;

        const onPointerMove = (moveEvent: PointerEvent) => {
            const newWidth = Math.max(280, Math.min(650, startWidth + (moveEvent.clientX - startX)));
            const newHeight = Math.max(240, Math.min(850, startHeight + (moveEvent.clientY - startY)));
            setMenuSize({ width: newWidth, height: newHeight });
        };

        const onPointerUp = () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
        };

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
    };

    if (isCollapsed) {
        return (
            <button
                type="button"
                style={{ left: position.x, top: position.y }}
                onClick={() => setIsCollapsed(false)}
                onPointerDown={handleMovePointerDown}
                className="fixed z-[9999] px-3.5 py-2 rounded-xl flex items-center space-x-2 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 bg-gray-900/90 hover:bg-gray-800/90 backdrop-blur-md shadow-lg shadow-cyan-500/10 cursor-grab active:cursor-grabbing transition-all hover:scale-105 pointer-events-auto touch-none select-none"
                title="Click to expand, drag to move"
            >
                <GripVertical className="w-3.5 h-3.5 text-cyan-400/70" />
                <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-semibold tracking-wider">CORE SETTINGS</span>
            </button>
        );
    }

    const tabs: { id: TabType; label: string; icon: React.ReactNode; enabled?: boolean; toggle?: () => void }[] = [
        { id: 'mesh', label: 'Mesh', icon: <Box className="w-3.5 h-3.5" /> },
        { id: 'perlin', label: 'Perlin', icon: <Sparkles className="w-3.5 h-3.5" />, enabled: isPerlinEnabled, toggle: togglePerlinEnabled },
        { id: 'breathing', label: 'Breathing', icon: <Activity className="w-3.5 h-3.5" />, enabled: isBreathing, toggle: toggleBreathing },
        { id: 'lighting', label: 'Lighting', icon: <Sun className="w-3.5 h-3.5" /> },
        { id: 'contours', label: 'Contours', icon: <Layers className="w-3.5 h-3.5" />, enabled: isContourEnabled, toggle: toggleContourEnabled },
    ];

    return (
        <div
            style={{ left: position.x, top: position.y, width: menuSize.width, height: menuSize.height }}
            className="fixed z-[9999] bg-gray-900/95 backdrop-blur-md p-3.5 rounded-2xl flex flex-col space-y-3 shadow-2xl border border-cyan-500/30 pointer-events-auto select-none overflow-hidden"
        >
            {/* Header Controls */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-2.5 shrink-0">
                <div
                    onPointerDown={handleMovePointerDown}
                    className="flex items-center space-x-1.5 cursor-grab active:cursor-grabbing text-gray-300 hover:text-white group touch-none select-none py-0.5 pr-2"
                    title="Click and drag to move menu"
                >
                    <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-white font-bold text-sm tracking-wide">Core Settings</h3>
                </div>


                <div className="flex items-center space-x-1.5">
                    <button
                        type="button"
                        onClick={handleCategoryReset}
                        className="px-2 py-1 text-[11px] font-mono text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors flex items-center space-x-1"
                        title="Reset current active tab"
                    >
                        <RotateCcw className="w-3 h-3" />
                        <span>Tab</span>
                    </button>
                    <button
                        type="button"
                        onClick={resetAll}
                        className="px-2 py-1 text-[11px] font-mono bg-red-900/40 hover:bg-red-800/60 text-red-200 border border-red-700/50 rounded-lg flex items-center space-x-1 transition-colors"
                        title="Reset all settings"
                    >
                        <span>Reset All</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsCollapsed(true)}
                        className="p-1 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
                        title="Minimize Menu"
                    >
                        <Minimize2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {/* Category Navigation Tabs */}
            <div className="flex items-center space-x-1 bg-gray-950/60 p-1 rounded-xl border border-gray-800/80 overflow-x-auto scrollbar-none shrink-0">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                                isActive
                                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm shadow-cyan-500/20'
                                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                            }`}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                            {tab.toggle !== undefined && (
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        tab.toggle?.();
                                    }}
                                    className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                                        tab.enabled ? 'bg-cyan-400 shadow-sm shadow-cyan-400' : 'bg-gray-600'
                                    }`}
                                    title={`Toggle ${tab.label}`}
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content Panel (Dynamically expands with vertical resize) */}
            <div className="flex-1 min-h-0 p-3 bg-gray-950/40 rounded-xl border border-gray-800/60 overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-gray-700">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        transition={{ duration: 0.15 }}
                    >
                        {activeTab === 'mesh' && <GeometryControls />}

                        {activeTab === 'perlin' && (
                            <div className="flex flex-col space-y-4">
                                <ColorControl />
                                <TimeControl />
                                <AmplitudeControl />
                                <FrequencyControl />
                                <FrequencyVectorControl />
                                <LacunarityControl />
                                <PersistenceControl />
                                <OctavesControl />
                            </div>
                        )}

                        {activeTab === 'breathing' && (
                            <div className="flex flex-col space-y-4">
                                <BreathingSpeedControl />
                                <BreathingAmplitudeControl />
                            </div>
                        )}

                        {activeTab === 'lighting' && <LightingControls />}

                        {activeTab === 'contours' && <ContourControls />}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom-Right Corner Resize Grip Handle */}
            <div
                onPointerDown={handleResizePointerDown}
                className="absolute bottom-1 right-1 w-4 h-4 cursor-se-resize flex items-center justify-center text-gray-500 hover:text-cyan-400 touch-none select-none z-10"
                title="Drag corner to resize menu"
            >
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 16 16">
                    <path d="M14 14H12V12H14V14ZM14 10H12V8H14V10ZM10 14H8V12H10V14ZM14 6H12V4H14V6ZM10 10H8V8H10V10ZM6 14H4V12H6V14Z" />
                </svg>
            </div>
        </div>
    );
};