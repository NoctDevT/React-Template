import { 
  // MeshDistortMaterial, 
  shaderMaterial } from "@react-three/drei"
import { extend,
  //  useFrame 
  } from "@react-three/fiber"
// import { useMemo, useRef } from "react"
import * as THREE from 'three'
const IridescentMaterial = shaderMaterial(
    {
      time: 0,
      colorA: new THREE.Color('#2a9d8f'),
      colorB: new THREE.Color('#e9c46a'),
      resolution: new THREE.Vector2()
    },
    `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vNormal = normal;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    `
      uniform float time;
      uniform vec3 colorA;
      uniform vec3 colorB;
      uniform vec2 resolution;
      
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      // Noise functions
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
      
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                           0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                           -0.577350269189626,  // -1.0 + 2.0 * C.x
                           0.024390243902439); // 1.0 / 41.0
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                       + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }
      
      void main() {
        float n = snoise(vUv * 5.0 + time * 0.2);
        
        // Create hole pattern
        float holes = 0.0;
        for(float i = 0.0; i < 6.0; i++) {
          vec2 p = vUv * (3.0 + i) + vec2(sin(time * 0.1), cos(time * 0.1)) * i;
          holes += smoothstep(0.2, 0.21, length(fract(p) - 0.5));
        }
        
        // Iridescent effect
        float fresnel = pow(1.0 + dot(vNormal, normalize(vPosition)), 3.0);
        vec3 color = mix(colorA, colorB, fresnel + n * 0.2);
        
        // Combine effects
        gl_FragColor = vec4(color, (1.0 - holes) * 0.95);
      }
    `
  )
  
  extend({ IridescentMaterial })
  
  
  
  // interface HolePattern {
  //   position: THREE.Vector3
  //   size: number
  // }
  
  // interface IridescentOrbProps {
  //   radius?: number
  //   holeCount?: number
  //   distortionSpeed?: number
  //   distortionIntensity?: number
  //   baseColor?: string
  //   emissiveColor?: string
  // }
  
  // const IridescentOrb: React.FC<IridescentOrbProps> = ({
  //   radius = 1,
  //   holeCount = 30,
  //   distortionSpeed = 2,
  //   distortionIntensity = 0.4,
  //   baseColor = '#000000',
  //   emissiveColor = '#ff7eee'
  // }) => {
  //   const meshRef = useRef<THREE.Mesh>(null)
  //   const holePatternRef = useRef<THREE.Group>(null)
    
  //   const gradientMap = useMemo(() => {
  //     const canvas = document.createElement('canvas')
  //     canvas.width = 256
  //     canvas.height = 1
      
  //     const context = canvas.getContext('2d')!
  //     const gradient = context.createLinearGradient(0, 0, 256, 0)
  //     gradient.addColorStop(0, '#2a9d8f')
  //     gradient.addColorStop(1, '#e9c46a')
      
  //     context.fillStyle = gradient
  //     context.fillRect(0, 0, 256, 1)
      
  //     const texture = new THREE.CanvasTexture(
  //       canvas,
  //       THREE.UVMapping,
  //       THREE.ClampToEdgeWrapping,
  //       THREE.ClampToEdgeWrapping,
  //       THREE.LinearFilter,
  //       THREE.LinearFilter
  //     )
      
  //     return texture
  //   }, [])
  
  //   const holePattern: HolePattern[] = useMemo(() => {
  //     return new Array(holeCount).fill(null).map(() => ({
  //       position: new THREE.Vector3(
  //         Math.random() * 2 - 1,
  //         Math.random() * 2 - 1,
  //         Math.random() * 2 - 1
  //       ).normalize(),
  //       size: Math.random() * 0.3 + 0.1,
  //     }))
  //   }, [holeCount])
  
  //   // Animation
  //   useFrame((state) => {
  //     if (!meshRef.current) return
  //     const time = state.clock.getElapsedTime()
  //     meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1
  //     meshRef.current.rotation.y = Math.cos(time * 0.2) * 0.1
  //   })
  
  //   return (
  //     <group>
  //       {/* Main orb */}
  //       <mesh ref={meshRef}>
  //         <sphereGeometry args={[radius, 64, 64]} />
  //         <MeshDistortMaterial
  //           color={baseColor}
  //           roughness={0.1}
  //           metalness={0.8}
  //           distort={distortionIntensity}
  //           speed={distortionSpeed}
  //           map={gradientMap}
  //         />
  //       </mesh>
  
  //       {holePattern.map((hole, idx) => (
  //         <mesh
  //           key={idx}
  //           position={[
  //             hole.position.x * (radius * 0.9),
  //             hole.position.y * (radius * 0.9),
  //             hole.position.z * (radius * 0.9)
  //           ]}
  //           scale={hole.size}
  //         >
  //           <sphereGeometry args={[0.1, 32, 32]} />
  //           <meshStandardMaterial
  //             color="#ffffff"
  //             emissive={emissiveColor}
  //             emissiveIntensity={2}
  //             transparent={true}
  //             opacity={0.9}
  //           />
  //         </mesh>
  //       ))}
  
  //       <mesh scale={radius * 1.1}>
  //         <sphereGeometry args={[1, 32, 32]} />
  //         <meshStandardMaterial
  //           color="#4fc3dc"
  //           transparent={true}
  //           opacity={0.1}
  //         />
  //       </mesh>
  //     </group>
  //   )
  // }
  