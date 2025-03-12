import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { fragmentTexture, vertexTexture } from "./shaders/sunShader";
import { vertexSun, fragmentSun } from "./Materials/sunMaterial";

interface Uniforms {
  [key: string]: THREE.IUniform<any>;
}

export const Sun: React.FC = () => {
  const [cubeRenderTarget] = useState(
    () =>
      new THREE.WebGLCubeRenderTarget(256, {
        format: THREE.RGBFormat,
        generateMipmaps: true,
        minFilter: THREE.LinearMipmapLinearFilter,
        colorSpace: THREE.LinearSRGBColorSpace,
      })
  );

  // Explicitly type the refs
  const meshRef = useRef<THREE.Mesh | null>(null);
  const cameraRef = useRef<THREE.CubeCamera | null>(null);

  const uniformsSun = useMemo<Uniforms>(
    () => ({
      time: { value: 0 },
      uPerlin: { value: cubeRenderTarget.texture },
    }),
    [cubeRenderTarget.texture]
  );

  const uniformsTexture = useMemo<Uniforms>(
    () => ({
      time: { value: 0 },
      resolution: { value: new THREE.Vector4() },
    }),
    []
  );

  useFrame(({ clock, gl, scene }) => {
    const elapsedTime = clock.getElapsedTime();

    if (meshRef.current && cameraRef.current) {
      uniformsSun.time.value = elapsedTime * 5;
      uniformsTexture.time.value = elapsedTime * 5;

      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.needsUpdate = true;

      cameraRef.current.update(gl, scene);
    }
  });

  useEffect(() => {
    return () => {
      // Cleanup references when unmounting
      meshRef.current = null;
      cameraRef.current = null;
    };
  }, []);

  return (
    <>
      <cubeCamera ref={cameraRef} args={[0.1, 10, cubeRenderTarget]} />

      <mesh ref={meshRef} scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <shaderMaterial
          uniforms={uniformsSun}
          vertexShader={vertexSun}
          fragmentShader={fragmentSun}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh scale={[1, 1, 1]}>
        <sphereGeometry args={[1, 32, 32]} />
        <shaderMaterial
          uniforms={uniformsTexture}
          vertexShader={vertexTexture}
          fragmentShader={fragmentTexture}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};
