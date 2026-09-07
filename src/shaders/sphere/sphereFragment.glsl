uniform vec3 uColorLow;
uniform vec3 uColorHigh;

uniform vec3 uKeyLightDir;
uniform float uKeyLightIntensity;

uniform vec3 uFillLightDir;
uniform vec3 uFillLightColor;
uniform float uFillLightIntensity;

uniform vec3 uRimColor;
uniform float uRimPower;
uniform float uRimIntensity;

uniform float uSpecularIntensity;
uniform float uShininess;

uniform vec3 uEmissiveColor;
uniform float uEmissiveIntensity;
uniform float uValleyEmissiveIntensity;

uniform bool uIsContourEnabled;
uniform vec3 uContourColor;
uniform float uContourCount;
uniform float uContourWidth;
uniform float uContourIntensity;

varying vec3 vPosition;
varying float vNoise;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  // Map noise from roughly [-1.0, 1.0] range to [0.0, 1.0]
  float normalizedNoise = clamp(vNoise * 0.5 + 0.5, 0.0, 1.0);

  // Apply smoothstep to enhance contrast so valleys reach deep colorLow and peaks reach colorHigh
  float colorFactor = smoothstep(0.15, 0.85, normalizedNoise);

  vec3 baseColor = mix(uColorLow, uColorHigh, colorFactor);

  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewPosition);

  // Key Light (Primary Directional Light)
  vec3 L_key = normalize(uKeyLightDir);
  float NdotL_key = max(0.0, dot(N, L_key));
  vec3 keyDiffuse = baseColor * NdotL_key * uKeyLightIntensity;

  // Fill Light (Secondary Directional Cool Light)
  vec3 L_fill = normalize(uFillLightDir);
  float NdotL_fill = max(0.0, dot(N, L_fill));
  vec3 fillDiffuse = uFillLightColor * NdotL_fill * uFillLightIntensity;

  // Ambient Floor
  vec3 ambient = baseColor * 0.15;

  // Specular Highlight (Blinn-Phong)
  vec3 H = normalize(L_key + V);
  float NdotH = max(0.0, dot(N, H));
  float specFactor = pow(NdotH, max(1.0, uShininess));
  vec3 specular = vec3(1.0) * specFactor * uSpecularIntensity;

  // Rim Light (Fresnel Glow around sphere outline)
  float rimFactor = 1.0 - clamp(dot(N, V), 0.0, 1.0);
  rimFactor = pow(rimFactor, max(0.1, uRimPower));
  vec3 rim = uRimColor * rimFactor * uRimIntensity;

  // Emissive Light (Overall Emissive + Inner Valley Crevice Glow)
  vec3 baseEmissive = uEmissiveColor * uEmissiveIntensity;
  float valleyFactor = pow(1.0 - colorFactor, 2.0); // Deep valleys emit intense inner glow
  vec3 valleyEmissive = uEmissiveColor * valleyFactor * uValleyEmissiveIntensity;
  vec3 emissive = baseEmissive + valleyEmissive;

  // Topographic Contour Iso-Lines
  vec3 contourGlow = vec3(0.0);
  if (uIsContourEnabled) {
    // Use un-clamped noise so contour lines continue all the way to the top of mountain peaks
    float unclampedNoise = vNoise * 0.5 + 0.5;
    float contourSine = sin(unclampedNoise * 3.14159265 * uContourCount);
    float line = smoothstep(1.0 - max(0.01, uContourWidth) * 0.25, 1.0, abs(contourSine));
    contourGlow = uContourColor * line * uContourIntensity;
  }

  vec3 finalColor = keyDiffuse + fillDiffuse + ambient + specular + rim + emissive + contourGlow;
  
  gl_FragColor = vec4(finalColor, 1.0);
}
