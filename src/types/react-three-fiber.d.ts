// react-three-fiber.d.ts
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

declare module "@react-three/fiber" {
  interface ThreeElements {
    effectComposer: ReactThreeFiber.Object3DNode<EffectComposer, typeof EffectComposer>;
    renderPass: ReactThreeFiber.Object3DNode<RenderPass, typeof RenderPass>;
    shaderPass: ReactThreeFiber.Object3DNode<ShaderPass, typeof ShaderPass>;
    unrealBloomPass: ReactThreeFiber.Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>;
  }
}
