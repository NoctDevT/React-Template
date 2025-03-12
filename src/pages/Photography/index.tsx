import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import Carousel, {  } from '../../components/three-js-components/carousel/carousel';
import { ChromaticAberration, EffectComposer as PostProcessComposer } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three'

const Photography: React.FC = () => {
  return (
    <div className="relative h-screen w-screen">
       <div className="absolute top-0 left-0 w-full h-full z-0">
        <Suspense fallback={<h1>Loading...</h1>}>
         <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
         <PostProcessComposer>
              <ChromaticAberration
                blendFunction={BlendFunction.MULTIPLY}
                offset={new THREE.Vector2(0.05, 0.05)}
                radialModulation={true}
                modulationOffset={0.91}
              />

        </PostProcessComposer>
        <Carousel />
          </Canvas>
        </Suspense>
      </div>
    </div>

  );
};

export default Photography;


