// import * as THREE from "three";

const vertexSun = `
  uniform float time;
  // varying vec2 vUv;
  // varying vec3 vPosition;
  uniform vec2 pixels;
  float PI = 3.141592653589793238;
  
  
  varying vec3 vNormal; 
  
  varying vec3 vLayer0;
  varying vec3 vLayer1;
  varying vec3 vLayer2;
  varying vec3 eyeVector; 
  
  
  mat2 rotate(float a){
    float s = sin(a);
    float c = cos(a); 
    return mat2(c, -s, s, c);
  }
  
  void main() {
  
  vNormal = normal;
  
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  eyeVector = normalize(worldPosition.xyz - cameraPosition );
  
    float t = time*0.005;
    mat2 rot =  rotate(t); 
    mat2 rot1 =  rotate(t + 5.); 
    mat2 rot2 =  rotate(t + 15.); 
  
    vec3 p0 = position; 
    p0.yz = rot *p0.yz;
    vLayer0 = p0;
  
  
    vec3 p1 = position; 
    p1.xz = rot1 *p1.xz;
    vLayer1 = p1;
  
  
    vec3 p2 = position; 
    p2.xy = rot2 *p2.xy;
    vLayer2 = p2;
  
    // vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
      
      `;

const fragmentSun = `
   
  uniform float time;
  uniform float progress;
  uniform sampler2D texture1;
  uniform vec4 resolution;
  uniform samplerCube uPerlin; 
  // varying vec2 vUv;
  // varying vec3 vPosition;
  
  varying vec3 vNormal;
  varying vec3 eyeVector;
  
  
  varying vec3 vLayer0;
  varying vec3 vLayer1;
  varying vec3 vLayer2;
  
  float PI = 3.141592653589793238;
  
  
  vec3 brightnessToColor(float b ) {
    b*=0.25;
    return (vec3(b, b*b, b*b*b*b)/0.25)*0.6;
  }
  
  
  float Fresnel(vec3 eyeVector, vec3 worldNormal){
    return pow(1.0 + dot(eyeVector, worldNormal), 3.0); 
  }
  
  
  float supersun() {
  
   float sum = 0.;
   float layer2 = textureCube(uPerlin, vLayer1).r;
   layer2 = layer2 * 0.8;
  
   sum+= textureCube(uPerlin, vLayer0).r;
   sum-= layer2;
   sum+= textureCube(uPerlin, vLayer2).r;
   sum *= 0.3;
  
    return sum; 
  }
  
  
  void main()	{
    // vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
  
  float fres = Fresnel(eyeVector, vNormal);
  
  
  
  float brightness = supersun();
  brightness = brightness * 4. + 1.;
  brightness += fres;
  
  vec3 col = brightnessToColor(brightness);
    gl_FragColor = vec4(col,1.); 
  
  }
  `;

export { vertexSun, fragmentSun }