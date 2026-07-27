import { useState, memo, useCallback } from "react";
import { RotateCcw, ChevronDown, Folder } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCoreStore, DEFAULT_CORE_SETTINGS } from "../../store/useCoreStore";

// --- MEMOIZED ISOLATED CONTROLS FOR MAXIMUM PERFORMANCE ---

const TimeControl = memo(() => {
    const perlinTime = useCoreStore((state) => state.perlinTime);
    const setPerlinTime = useCoreStore((state) => state.setPerlinTime);

    return (
        <div className="flex flex-col space-y-1">
            <label className="text-white font-semibold text-sm">Time</label>
            <div className="flex items-center space-x-2">
                <input
                    type="range"
                    min={0}
                    max={10}
                    step={0.1}
                    value={perlinTime}
                    onChange={(e) => setPerlinTime(Number(e.target.value))}
                    className="w-32 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1 cursor-pointer"
                />
                <input
                    type="number"
                    step={0.1}
                    value={perlinTime}
                    onChange={(e) => setPerlinTime(Number(e.target.value))}
                    className="w-16 border border-gray-600 bg-gray-900 text-white text-xs rounded-md px-1 py-1"
                />
                <button
                    type="button"
                    onClick={() => setPerlinTime(DEFAULT_CORE_SETTINGS.perlinTime)}
                    title="Reset Time to default (0)"
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
            <label className="text-white font-semibold text-sm">Amplitude</label>
            <div className="flex items-center space-x-2">
                <input
                    type="range"
                    min={0}
                    max={10}
                    step={0.01}
                    value={amplitude}
                    onChange={(e) => setPerlinAmplitude(Number(e.target.value))}
                    className="w-32 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1 cursor-pointer"
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
            <label className="text-white font-semibold text-sm">Frequency</label>
            <div className="flex items-center space-x-2">
                <input
                    type="range"
                    min={0}
                    max={10}
                    step={0.01}
                    value={frequency}
                    onChange={(e) => setPerlinFrequency(Number(e.target.value))}
                    className="w-32 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1 cursor-pointer"
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
                <label className="text-white font-semibold text-sm">
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
                        className="w-32 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1 cursor-pointer"
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
            <label className="text-white font-semibold text-sm">Lacunarity</label>
            <div className="flex items-center space-x-2">
                <input
                    type="range"
                    min={0}
                    max={10}
                    step={0.01}
                    value={lacunarity}
                    onChange={(e) => setPerlinLacunarity(Number(e.target.value))}
                    className="w-32 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1 cursor-pointer"
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
            <label className="text-white font-semibold text-sm">Persistence</label>
            <div className="flex items-center space-x-2">
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={persistence}
                    onChange={(e) => setPerlinPersistence(Number(e.target.value))}
                    className="w-32 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1 cursor-pointer"
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
            <label className="text-white font-semibold text-sm">Octaves</label>
            <div className="flex items-center space-x-2">
                <input
                    type="range"
                    min={1}
                    max={8}
                    step={1}
                    value={octaves}
                    onChange={(e) => setPerlinOctaves(Number(e.target.value))}
                    className="w-32 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1 cursor-pointer"
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
        <div className="flex flex-col space-y-2 border-t border-gray-700/60 pt-2">
            <label className="text-white font-semibold text-sm">Sphere Colors</label>
            <div className="grid grid-cols-2 gap-2">
                {/* Low Color (Downs / Valleys) */}
                <div className="flex flex-col space-y-1">
                    <span className="text-xs text-gray-400 font-medium">Valleys (Downs)</span>
                    <div className="flex items-center space-x-1 border border-gray-600 bg-gray-900 rounded-md p-1">
                        <input
                            type="color"
                            value={colorLow}
                            onChange={(e) => setPerlinColorLow(e.target.value)}
                            className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
                            title="Valley Color (Perlin downs)"
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
                            title="Reset Valley Color (#ff1a40)"
                            className="p-1 text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                        >
                            <RotateCcw className="w-3 h-3" />
                        </button>
                    </div>
                </div>

                {/* High Color (Tops / Peaks) */}
                <div className="flex flex-col space-y-1">
                    <span className="text-xs text-gray-400 font-medium">Peaks (Tops)</span>
                    <div className="flex items-center space-x-1 border border-gray-600 bg-gray-900 rounded-md p-1">
                        <input
                            type="color"
                            value={colorHigh}
                            onChange={(e) => setPerlinColorHigh(e.target.value)}
                            className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
                            title="Peak Color (Perlin tops)"
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
                            title="Reset Peak Color (#00d9ff)"
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
            <label className="text-white font-semibold text-sm">Breathing Speed</label>
            <div className="flex items-center space-x-2">
                <input
                    type="range"
                    min={0}
                    max={3}
                    step={0.01}
                    value={breathingSpeed}
                    onChange={(e) => setBreathingSpeed(Number(e.target.value))}
                    className="w-32 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1 cursor-pointer"
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
            <label className="text-white font-semibold text-sm">Breathing Amplitude</label>
            <div className="flex items-center space-x-2">
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.005}
                    value={breathingAmplitude}
                    onChange={(e) => setBreathingAmplitude(Number(e.target.value))}
                    className="w-32 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1 cursor-pointer"
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

export const CoreSettings = () => {
    const [isPerlinOpen, setIsPerlinOpen] = useState(true);
    const [isBreathingOpen, setIsBreathingOpen] = useState(true);

    const isPerlinEnabled = useCoreStore((state) => state.isPerlinEnabled);
    const togglePerlinEnabled = useCoreStore((state) => state.togglePerlinEnabled);
    const isBreathing = useCoreStore((state) => state.isBreathing);
    const toggleBreathing = useCoreStore((state) => state.toggleBreathing);

    const resetPerlin = useCoreStore((state) => state.resetPerlin);
    const resetBreathing = useCoreStore((state) => state.resetBreathing);
    const resetAll = useCoreStore((state) => state.resetAll);

    return (
        <div className="fixed top-30 left-0 z-50 m-4 bg-gray-800 p-4 rounded-lg flex flex-col space-y-4 max-h-[80vh] overflow-y-auto shadow-xl border border-gray-700 w-80">
            <div className="flex items-center justify-between border-b border-gray-700 pb-2">
                <h3 className="text-white font-bold text-base">Core Settings</h3>
                <button
                    type="button"
                    onClick={resetAll}
                    className="px-2 py-1 text-xs bg-red-900/40 hover:bg-red-800/60 text-red-200 border border-red-700/50 rounded flex items-center space-x-1 transition-colors"
                    title="Reset all settings to default"
                >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset All</span>
                </button>
            </div>

            {/* Foldable Perlin Folder */}
            <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900/40">
                <div className="flex items-center justify-between p-2.5 bg-gray-700/60 hover:bg-gray-700 transition-colors text-white font-semibold text-sm select-none">
                    <div className="flex items-center space-x-2.5">
                        <input
                            type="checkbox"
                            checked={isPerlinEnabled}
                            onChange={() => togglePerlinEnabled()}
                            title="Enable/Disable Perlin Noise"
                            className="border border-gray-600 bg-gray-900 rounded w-4 h-4 cursor-pointer accent-cyan-500"
                        />
                        <button
                            type="button"
                            onClick={() => setIsPerlinOpen(!isPerlinOpen)}
                            className="flex items-center space-x-2 text-left"
                        >
                            <Folder className="w-4 h-4 text-cyan-400" />
                            <span>Perlin</span>
                            <motion.div
                                animate={{ rotate: isPerlinOpen ? 0 : -90 }}
                                transition={{ duration: 0.2 }}
                                className="ml-1 flex items-center"
                            >
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </motion.div>
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={resetPerlin}
                        className="px-2 py-0.5 text-xs text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-600 rounded transition-colors flex items-center space-x-1 border border-gray-600/50"
                        title="Reset all settings in Perlin folder to defaults"
                    >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset Folder</span>
                    </button>
                </div>

                <AnimatePresence initial={false}>
                    {isPerlinOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden bg-gray-800/50 border-t border-gray-700"
                        >
                            <div className="p-3 flex flex-col space-y-4">
                                <ColorControl />
                                <TimeControl />
                                <AmplitudeControl />
                                <FrequencyControl />
                                <FrequencyVectorControl />
                                <LacunarityControl />
                                <PersistenceControl />
                                <OctavesControl />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Foldable Breathing Folder */}
            <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900/40">
                <div className="flex items-center justify-between p-2.5 bg-gray-700/60 hover:bg-gray-700 transition-colors text-white font-semibold text-sm select-none">
                    <div className="flex items-center space-x-2.5">
                        <input
                            type="checkbox"
                            checked={isBreathing}
                            onChange={() => toggleBreathing()}
                            title="Enable/Disable Breathing"
                            className="border border-gray-600 bg-gray-900 rounded w-4 h-4 cursor-pointer accent-cyan-500"
                        />
                        <button
                            type="button"
                            onClick={() => setIsBreathingOpen(!isBreathingOpen)}
                            className="flex items-center space-x-2 text-left"
                        >
                            <Folder className="w-4 h-4 text-cyan-400" />
                            <span>Breathing</span>
                            <motion.div
                                animate={{ rotate: isBreathingOpen ? 0 : -90 }}
                                transition={{ duration: 0.2 }}
                                className="ml-1 flex items-center"
                            >
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </motion.div>
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={resetBreathing}
                        className="px-2 py-0.5 text-xs text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-600 rounded transition-colors flex items-center space-x-1 border border-gray-600/50"
                        title="Reset all settings in Breathing folder to defaults"
                    >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset Folder</span>
                    </button>
                </div>

                <AnimatePresence initial={false}>
                    {isBreathingOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden bg-gray-800/50 border-t border-gray-700"
                        >
                            <div className="p-3 flex flex-col space-y-4">
                                <BreathingSpeedControl />
                                <BreathingAmplitudeControl />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};