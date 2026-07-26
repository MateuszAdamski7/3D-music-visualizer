import { useCoreStore } from "../../store/useCoreStore";

export const CoreSettings = () => {
    const perlinAmplitude = useCoreStore((state) => state.perlinAmplitude);
    const perlinFrequency = useCoreStore((state) => state.perlinFrequency);
    const perlinLacunarity = useCoreStore((state) => state.perlinLacunarity);
    const perlinPersistence = useCoreStore((state) => state.perlinPersistence);
    const perlinOctaves = useCoreStore((state) => state.perlinOctaves);
    const isBreathing = useCoreStore((state) => state.isBreathing);
    const toggleBreathing = useCoreStore((state) => state.toggleBreathing);

    const setPerlinAmplitude = useCoreStore((state) => state.setPerlinAmplitude);
    const setPerlinFrequency = useCoreStore((state) => state.setPerlinFrequency);
    const setPerlinLacunarity = useCoreStore((state) => state.setPerlinLacunarity);
    const setPerlinPersistence = useCoreStore((state) => state.setPerlinPersistence);
    const setPerlinOctaves = useCoreStore((state) => state.setPerlinOctaves);

    return (
        <div className="fixed top-30 left-0 z-50 m-4 bg-gray-800 p-4 rounded-lg flex flex-col space-y-4">
            <label className="text-white">Perlin Amplitude</label>
            <input type="range" min={0} max={5} step={0.01} value={perlinAmplitude} onChange={(e) => setPerlinAmplitude(Number(e.target.value))} className="w-48 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1" />

            <label className="text-white">Perlin Frequency</label>
            <input type="range" min={0} max={1} step={0.01} value={perlinFrequency} onChange={(e) => setPerlinFrequency(Number(e.target.value))} className="w-48 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1" />

            <label className="text-white">Perlin Lacunarity</label>
            <input type="range" min={0} max={1} step={0.01} value={perlinLacunarity} onChange={(e) => setPerlinLacunarity(Number(e.target.value))} className="w-48 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1" />

            <label className="text-white">Perlin Persistence</label>
            <input type="range" min={0} max={1} step={0.01} value={perlinPersistence} onChange={(e) => setPerlinPersistence(Number(e.target.value))} className="w-48 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1" />

            <label className="text-white">Perlin Octaves</label>
            <input type="range" min={0} max={1} step={0.01} value={perlinOctaves} onChange={(e) => setPerlinOctaves(Number(e.target.value))} className="w-48 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1" />

            <label className="text-white">Breathing</label>
            <input type="checkbox" checked={isBreathing} onChange={() => toggleBreathing()} className="w-48 border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-1" />
        </div>
    );
}