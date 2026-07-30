uniform float uTime;

uniform float uPerlinTime;
uniform bool uIsPerlinEnabled;
uniform float uPerlinAmplitude;
uniform float uPerlinFrequency;
uniform vec3 uPerlinFrequencyVec;

// --- PARAMETRY FBM ---
uniform float uPerlinLacunarity;
uniform float uPerlinPersistence;
uniform int uPerlinOctaves;

// --- PARAMETRY BREATHING ---
uniform bool uIsBreathing;
uniform float uBreathingSpeed;
uniform float uBreathingAmplitude;

float mod289(float x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

float permute(float x) {
  return mod289(((x*34.0)+10.0)*x);
}

vec4 permute(vec4 x) {
  return mod289(((x*34.0)+10.0)*x);
}

float taylorInvSqrt(float r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec4 grad4(float j, vec4 ip) {
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
  vec4 p, s;

  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
  s = vec4(lessThan(p, vec4(0.0)));
  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;
  return p;
}

// 4D Simplex Noise for omnidirectional morphing
float snoise(vec4 v) {
  const vec4 C = vec4( 0.138196601125011, // (5 - sqrt(5))/20 G4
                       0.276393202250021, // 2 * G4
                       0.414589803375031, // 3 * G4
                      -0.447213595499958); // -1 + 4 * G4

  vec4 i  = floor(v + dot(v, vec4(0.309016994374947451)) );
  vec4 x0 = v - i + dot(i, C.xxxx);

  vec4 i0;
  vec3 isX = step( x0.yzw, x0.xxx );
  vec3 isYZ = step( x0.zww, x0.yyz );
  i0.x = isX.x + isX.y + isX.z;
  i0.yzw = 1.0 - isX;
  i0.y += isYZ.x + isYZ.y;
  i0.zw += 1.0 - isYZ.xy;
  i0.z += isYZ.z;
  i0.w += 1.0 - isYZ.z;

  vec4 i3 = clamp( i0, 0.0, 1.0 );
  vec4 i2 = clamp( i0 - 1.0, 0.0, 1.0 );
  vec4 i1 = clamp( i0 - 2.0, 0.0, 1.0 );

  vec4 x1 = x0 - i1 + C.xxxx;
  vec4 x2 = x0 - i2 + C.yyyy;
  vec4 x3 = x0 - i3 + C.zzzz;
  vec4 x4 = x0 + C.wwww;

  i = mod289(i);
  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
  vec4 j1 = permute( permute( permute( permute (
             i.w + vec4(i1.w, i2.w, i3.w, 1.0) )
           + i.z + vec4(i1.z, i2.z, i3.z, 1.0) )
           + i.y + vec4(i1.y, i2.y, i3.y, 1.0) )
           + i.x + vec4(i1.x, i2.x, i3.x, 1.0) );

  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0);

  vec4 p0 = grad4(j0,   ip);
  vec4 p1 = grad4(j1.x, ip);
  vec4 p2 = grad4(j1.y, ip);
  vec4 p3 = grad4(j1.z, ip);
  vec4 p4 = grad4(j1.w, ip);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  p4 *= taylorInvSqrt(dot(p4,p4));

  vec4 p0123 = vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3));
  float p4_dot = dot(p4, x4);

  vec4 m0 = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  float m4 = max(0.6 - dot(x4,x4), 0.0);
  m0 = m0 * m0;
  m4 = m4 * m4;

  return 49.0 * (dot(m0*m0, p0123) + m4*m4*p4_dot);
}

float fbm(vec4 p) {
  float value = 0.0;
  float amp = 1.0;
  float freq = 1.0;
  
  for (int i = 0; i < 10; i++) {
    if (i >= uPerlinOctaves) break;
    value += snoise(p * freq) * amp;
    freq *= uPerlinLacunarity;
    amp *= uPerlinPersistence;
  }
  
  return value;
}

varying vec3 vPosition;
varying float vNoise;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  float noiseDisplacement = 0.0;
  float rawNoise = 0.0;

  if (uIsPerlinEnabled) {
    vec3 spacePos = position * uPerlinFrequency * uPerlinFrequencyVec;
    vec4 noiseInputSpace = vec4(spacePos, uPerlinTime * 0.4);
    float noise = fbm(noiseInputSpace);
    float displacement = noise / 5.0;
    noiseDisplacement = displacement * uPerlinAmplitude;
    rawNoise = noise;
  }

  float breathing = 0.0;
  if (uIsBreathing) {
    breathing = uBreathingAmplitude * sin(uBreathingSpeed);
  }

  vec3 newPosition = position + normal * (noiseDisplacement + breathing);

  vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
  vViewPosition = -mvPosition.xyz;
  vNormal = normalize(normalMatrix * normal);
  vPosition = newPosition;
  vNoise = rawNoise;
  
  gl_Position = projectionMatrix * mvPosition;
}
