import { useEffect, useMemo, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface PlaneProps {
  texture: string;
  width: number;
  height: number;
  active: boolean;
  [key: string]: any; 
}

const Plane: React.FC<PlaneProps> = ({ texture, width, height, active, ...props }) => {
  const $mesh = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const tex = useTexture(texture);

  useEffect(() => {
    if ($mesh.current?.material instanceof THREE.ShaderMaterial) {
      const material = $mesh.current.material;

      material.uniforms.uZoomScale.value.x = viewport.width / width;
      material.uniforms.uZoomScale.value.y = viewport.height / height;

      gsap.to(material.uniforms.uProgress, {
        value: active ? 1 : 0,
      });

      gsap.to(material.uniforms.uRes.value, {
        x: active ? viewport.width : width ,
        y: active ? viewport.height : height,
      });
    }
  }, [viewport, active, width, height]);

  const shaderArgs = useMemo(() => ({
    uniforms: {
      uProgress: { value: 0 },
      uZoomScale: { value: { x: 1, y: 1 } },
      uTex: { value: tex },
      uRes: { value: { x: 1, y: 1 } },
      uImageRes: {
        value: { x: tex.source.data.width, y: tex.source.data.height },
      },
    },
    vertexShader:  `
      varying vec2 vUv;
      uniform float uProgress;
      uniform vec2 uZoomScale;

      void main() {
        vUv = uv;
        vec3 pos = position;
        float angle = uProgress * 3.14159265 / 2.0;
        float wave = cos(angle);
        float c = sin(length(uv - 0.5) * 15.0 + uProgress * 12.0) * 0.5 + 0.5;
        pos.x *= mix(1.0, uZoomScale.x + wave * c, uProgress);
        pos.y *= mix(1.0, uZoomScale.y + wave * c, uProgress);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader:  `
      uniform sampler2D uTex;
      uniform vec2 uRes;
      uniform vec2 uZoomScale;
      uniform vec2 uImageRes;

      /*------------------------------
      Background Cover UV
      --------------------------------
      u = basic UV
      s = screen size
      i = image size
      ------------------------------*/
      vec2 CoverUV(vec2 u, vec2 s, vec2 i) {
        float rs = s.x / s.y; // Aspect ratio of screen
        float ri = i.x / i.y; // Aspect ratio of image
        vec2 st = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x); // New size
        vec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st; // Offset
        return u * s / st + o;
      }
        

      varying vec2 vUv;
      void main() {
        vec2 uv = CoverUV(vUv, uRes, uImageRes);
        vec3 tex = texture2D(uTex, uv).rgb;
        gl_FragColor = vec4(tex, 1.0);
      }
    `,
  }), [tex]);

  return (
    <mesh ref={$mesh} {...props}>
      <planeGeometry args={[width, height, 30, 30]} />
      <shaderMaterial args={[shaderArgs]} />
    </mesh>
  );
};

export default Plane;
