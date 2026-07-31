varying vec2 vUv;
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uSubColor;
uniform float uGridSize;
uniform float uLineWidth;
uniform float uSectionEvery;
uniform float uOpacity;
uniform float uPulseSpeed;
uniform float uShowPulse;
uniform float uShowDots;

void main() {
    // 1. Minor Cell Lines
    vec2 cellUv = vUv * uGridSize;
    vec2 cellGrid = abs(fract(cellUv - 0.5) - 0.5);
    float minorLine = min(cellGrid.x, cellGrid.y);
    float minorAlpha = 1.0 - smoothstep(0.0, uLineWidth, minorLine);

    // 2. Major Section Lines
    vec2 sectionUv = vUv * (uGridSize / uSectionEvery);
    vec2 sectionGrid = abs(fract(sectionUv - 0.5) - 0.5);
    float majorLine = min(sectionGrid.x, sectionGrid.y);
    float majorAlpha = 1.0 - smoothstep(0.0, uLineWidth * 1.5, majorLine);

    // 3. Intersection Glowing Node Dots
    vec2 cellCenter = fract(cellUv) - 0.5;
    float dotDist = length(cellCenter);
    float nodeDot = (1.0 - smoothstep(0.04, 0.12, dotDist)) * uShowDots;

    // 4. Expanding Radar Wave Energy Rings
    float distFromCenter = distance(vUv, vec2(0.5));
    float wave = sin(distFromCenter * 25.0 - uTime * uPulseSpeed);
    float ringPulse = smoothstep(0.4, 1.0, wave) * uShowPulse;

    // 5. Vignette Mask
    float vignette = smoothstep(0.55, 0.08, distFromCenter);

    // Combine Colors & Alpha
    vec3 lineColor = mix(uSubColor, uColor, majorAlpha * 0.8 + ringPulse * 0.4 + nodeDot * 0.6);
    float totalAlpha = (minorAlpha * 0.4 + majorAlpha * 0.8 + nodeDot * 0.7 + ringPulse * 0.3) * vignette * uOpacity;

    gl_FragColor = vec4(lineColor, clamp(totalAlpha, 0.0, 1.0));
}