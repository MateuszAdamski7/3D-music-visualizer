import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * GLSL Vertex Shader
 * Uses Three.js built-in uniforms: projectionMatrix, modelViewMatrix, normalMatrix, cameraPosition
 */
const cyberCoreVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uBass;
  uniform float uNoiseFrequency;
  uniform float uDisplacementScale;

  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vDisplacement;

  // --------------------------------------------------------------------------
  // GLSL 3D Simplex Noise Algorithm (by Ian McEwan, Ashima Arts)
  // --------------------------------------------------------------------------
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    // Built-in Three.js normalMatrix
    vNormal = normalize(normalMatrix * normal);

    // 1. Calculate Noise Position
    vec3 noisePos = position * uNoiseFrequency + vec3(uTime * 0.4);
    
    // 2. Generate Simplex Noise (-1.0 to 1.0)
    float noise = snoise(noisePos);

    // 3. Controlled Audio Displacement
    float bassFactor = clamp(uBass, 0.0, 1.2);
    float displacement = noise * uDisplacementScale * (0.2 + bassFactor * 0.6);
    vDisplacement = displacement;

    // 4. Offset vertex along surface normal
    vec3 newPosition = position + normal * displacement;

    // World position for camera view vector
    vWorldPosition = (modelMatrix * vec4(newPosition, 1.0)).xyz;

    // Standard Three.js GL position transform
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const cyberCoreFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uBass;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uFresnelPower;

  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vDisplacement;

  void main() {
    // Vector from surface pixel to camera
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);

    // Fresnel Effect (glow on silhouette edges)
    float fresnel = pow(1.0 - max(dot(viewDirection, vNormal), 0.0), uFresnelPower);

    // Color mix from valley to peak
    float mixFactor = clamp(vDisplacement * 2.0 + 0.5, 0.0, 1.0);
    vec3 baseColor = mix(uColorA, uColorB, mixFactor);

    // Combine base color with Fresnel edge glow and bass pulse
    vec3 finalColor = baseColor + uColorB * (fresnel * 1.2 + uBass * 0.5);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export const CyberCoreMaterial = shaderMaterial(
  {
    uTime: 0,
    uBass: 0,
    uTreble: 0,
    uNoiseFrequency: 1.2,
    uDisplacementScale: 0.35,
    uFresnelPower: 2.5,
    uColorA: new THREE.Color('#090821'),
    uColorB: new THREE.Color('#00f0ff'),
  },
  cyberCoreVertexShader,
  cyberCoreFragmentShader
);

extend({ CyberCoreMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    cyberCoreMaterial: React.JSX.IntrinsicElements['meshStandardMaterial'] & {
      uTime?: number;
      uBass?: number;
      uTreble?: number;
      uNoiseFrequency?: number;
      uDisplacementScale?: number;
      uFresnelPower?: number;
      uColorA?: THREE.Color;
      uColorB?: THREE.Color;
    };
  }
}
