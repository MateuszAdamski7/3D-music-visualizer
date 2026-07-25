import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

const audioSphereVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uBass;
  uniform float uMid;
  uniform float uTreble;

  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vDisplacement;
  varying float vSpikeIntensity;

  // --------------------------------------------------------------------------
  // Multi-Vertex Soft Dome Cap Spike Profile
  // Uses smoothstep(0.0, 0.30, r) to ensure multiple vertices share the peak height,
  // completely eliminating single-vertex pyramid artifacts.
  // --------------------------------------------------------------------------
  float calculateNarrowSmoothSpike(vec3 normPos, vec3 peakDir, float baseRadius) {
    float cosAngle = clamp(dot(normPos, peakDir), -1.0, 1.0);
    float angleDistance = acos(cosAngle); // Angular distance in radians
    
    if (angleDistance >= baseRadius) {
      return 0.0;
    }
    
    // Normalized radius from peak center (0.0 to 1.0)
    float r = angleDistance / baseRadius;
    
    // Soft Dome Cap: top 30% radius shares peak height (1.0), forming a multi-vertex rounded cap
    float cappedR = smoothstep(0.0, 0.30, r);
    return 0.5 * (1.0 + cos(3.141592653589793 * cappedR));
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec3 normPos = normalize(position);

    float safeBass = clamp(uBass, 0.0, 1.2);
    float safeTreble = clamp(uTreble, 0.0, 1.2);

    // --------------------------------------------------------------------------
    // STRICTLY 5 FIXED FOCAL PEAK DIRECTIONS ON THE SPHERE SURFACE
    // --------------------------------------------------------------------------
    vec3 peak1 = vec3(0.0, 1.0, 0.0);                   // 1. Top Peak
    vec3 peak2 = vec3(0.0, -1.0, 0.0);                  // 2. Bottom Peak
    vec3 peak3 = normalize(vec3(-0.95, 0.25, 0.8));     // 3. Front-Left Peak
    vec3 peak4 = normalize(vec3(0.95, 0.25, 0.8));      // 4. Front-Right Peak
    vec3 peak5 = normalize(vec3(0.0, 0.4, -1.0));       // 5. Back-Center Peak

    // Base radius (0.16 rad ≈ 9 degrees) for skinny cyber spikes
    float skinnyBaseRadius = 0.16;

    float p1 = calculateNarrowSmoothSpike(normPos, peak1, skinnyBaseRadius);
    float p2 = calculateNarrowSmoothSpike(normPos, peak2, skinnyBaseRadius);
    float p3 = calculateNarrowSmoothSpike(normPos, peak3, skinnyBaseRadius);
    float p4 = calculateNarrowSmoothSpike(normPos, peak4, skinnyBaseRadius);
    float p5 = calculateNarrowSmoothSpike(normPos, peak5, skinnyBaseRadius);

    // Tall, high-amplitude, aggressive extension on beat drops
    float s1 = p1 * (safeBass * 1.50);
    float s2 = p2 * (safeBass * 1.40);
    float s3 = p3 * (safeTreble * 1.50);
    float s4 = p4 * (safeTreble * 1.50);
    float s5 = p5 * ((safeBass + safeTreble) * 0.90);

    // Sum of displacement strictly localized to the 5 rounded peak domes
    float totalDisplacement = clamp(s1 + s2 + s3 + s4 + s5, -0.1, 1.7);
    vDisplacement = totalDisplacement;
    vSpikeIntensity = clamp(totalDisplacement * 1.8, 0.0, 1.0);

    // Extend position outwards along surface normal vector
    vec3 newPosition = position + normal * totalDisplacement;

    vWorldPosition = (modelMatrix * vec4(newPosition, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const audioSphereFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorBase;
  uniform vec3 uColorBass;
  uniform vec3 uColorMid;
  uniform vec3 uColorTreble;
  uniform float uFresnelPower;

  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vDisplacement;
  varying float vSpikeIntensity;

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);

    // Guard pow(0, x) against GPU log(0) NaN bugs
    float dotVal = clamp(1.0 - max(dot(viewDirection, vNormal), 0.0), 0.0001, 1.0);
    float fresnel = pow(dotVal, clamp(uFresnelPower, 1.0, 5.0));

    // Base color blend
    vec3 reactiveColor = mix(uColorBase, uColorBass, clamp(vDisplacement * 1.2, 0.0, 1.0));
    
    // Highlight the 5 skinny rounded peak tips with intense neon glow
    vec3 spikeGlow = mix(uColorBass, uColorTreble, clamp(vSpikeIntensity * 1.2, 0.0, 1.0));
    reactiveColor = mix(reactiveColor, spikeGlow, clamp(vSpikeIntensity * 2.5, 0.0, 1.0));

    // Add glowing Fresnel rim highlight
    vec3 finalColor = reactiveColor + uColorTreble * (fresnel * 1.4);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export const AudioSphereMaterial = shaderMaterial(
  {
    uTime: 0,
    uBass: 0,
    uMid: 0,
    uTreble: 0,
    uFresnelPower: 2.5,
    uColorBase: new THREE.Color('#090821'),
    uColorBass: new THREE.Color('#ff00aa'),
    uColorMid: new THREE.Color('#7000ff'),
    uColorTreble: new THREE.Color('#00f0ff'),
  },
  audioSphereVertexShader,
  audioSphereFragmentShader
);

extend({ AudioSphereMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    audioSphereMaterial: React.JSX.IntrinsicElements['meshStandardMaterial'] & {
      uTime?: number;
      uBass?: number;
      uMid?: number;
      uTreble?: number;
      uFresnelPower?: number;
      uColorBase?: THREE.Color;
      uColorBass?: THREE.Color;
      uColorMid?: THREE.Color;
      uColorTreble?: THREE.Color;
    };
  }
}
