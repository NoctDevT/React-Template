// import  { useRef, useEffect } from "react";
import {  
    // useFrame, useThree, 
    extend
 } from "@react-three/fiber";
// import { postProcessing } from "../Materials/postprocessing";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";


extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass });

// export default function Effects() {
//   const composer = useRef<EffectComposer>(null);
//   const shaderRef = useRef<ShaderPass>(null);
//   const { scene, gl, size, camera } = useThree();

//   useEffect(() => {
//     if (composer.current) {
//       composer.current.setSize(size.width, size.height);
//     }
//   }, [size]);

//   const timeRef = useRef<number>(0);
//   const noiseValue = useRef<number>(0);

//   useFrame(() => {
//     timeRef.current += 0.001;

//     if (noiseValue.current < 0.13) {
//       noiseValue.current += 0.002;
//     }

//     if (shaderRef.current) {
//       shaderRef.current.uniforms.time.value = timeRef.current;
//       shaderRef.current.uniforms.noise.value = noiseValue.current;
//     }

//     if (composer.current) {
//       composer.current.render();
//     }
//   });

//   return (
//     <effectComposer ref={composer} args={[gl]}>
//       <renderPass attachArray="passes" scene={scene} camera={camera} />
//       <unrealBloomPass attachArray="passes" args={[undefined, 0.7, 1, 0.74]} />
//       <shaderPass
//         ref={shaderRef}
//         attachArray="passes"
//         args={[postProcessing]}
//         material-uniforms-resolution-value={[1 / size.width, 2 / size.height]}
//         material-uniforms-time-value={timeRef.current}
//       />
//     </effectComposer>
//   );
// }


