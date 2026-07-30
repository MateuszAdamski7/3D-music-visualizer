export const EnvironmentLights = () => {
  return (
    <>
      {/* Ambient base lighting */}
      <ambientLight intensity={0.4} color="#090821" />

      {/* Primary Key Light */}
      <pointLight
        position={[10, 15, 10]}
        intensity={2.5}
        color="#00f0ff"
        distance={40}
        decay={2}
      />

      {/* Secondary Fill Light */}
      <pointLight
        position={[-10, -10, -10]}
        intensity={2.0}
        color="#ff007f"
        distance={40}
        decay={2}
      />

      {/* Accent Rim Light */}
      <pointLight
        position={[0, 10, -15]}
        intensity={3.0}
        color="#7000ff"
        distance={30}
        decay={2}
      />

      {/* Subtle Directional light for depth shadows */}
      <directionalLight
        position={[5, 10, 7]}
        intensity={0.8}
        color="#ffffff"
        castShadow
      />
    </>
  );
};

