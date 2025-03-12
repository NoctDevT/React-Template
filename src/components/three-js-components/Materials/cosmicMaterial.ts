import * as THREE from "three";

const reflectiveMaterial = {
  uniforms: {
    time: { type: "f", value: 0 },
    color1: { value: new THREE.Color(0x222222) }, // Darker base color
    highlightColor: { value: new THREE.Color(0xffffff) }, // Bright, white highlight color for edges
    reflectionIntensity: { value: 3.0 },
    edgeIntensity: { value: 5.0 },
    edgeColor: { value: new THREE.Color(0xffffff) }, // Pure white color for edges
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 color1;
    uniform vec3 highlightColor;
    uniform vec3 edgeColor;
    uniform float reflectionIntensity;
    uniform float edgeIntensity;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      // Fresnel effect to simulate glass-like reflection
      float fresnel = pow(1.0 - dot(vNormal, normalize(vViewPosition)), 5.0) * reflectionIntensity;

      // Edge detection to highlight each edge, simulating a diamond-like effect
      float edge = pow(abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), edgeIntensity);
      edge = smoothstep(0.0, 1.0, edge); // Smooth edges

      // Combine base color with fresnel reflections and bright edge highlights
      vec3 baseColor = mix(color1, highlightColor, fresnel);
      vec3 color = mix(baseColor, edgeColor, edge); // Apply edge color

      gl_FragColor = vec4(color, 0.8); // Slightly transparent for glass effect
    }
  `,
};

export { reflectiveMaterial };
