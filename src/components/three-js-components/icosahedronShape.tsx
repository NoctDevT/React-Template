import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import lunarLandscape from "./img/lunarTexture.png";
import water from "./img/water.png";
import { useTheme } from "../../providers/themeProvider";
import { customShaders } from './shaders/ShaderMaterial';
import useWindowDimensions from "../../hooks/getWindowSize";

interface BoxProps {
  posX: number;
  posY: number;
  scale?: number;
}

export function IcosahedronGeometry({ posX, posY, scale: initialScale = 0.83 }: BoxProps) {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions(); 
  const { viewport } = useThree(); 
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [scale, setScale] = useState(initialScale);
  const [adjustedPosX, setAdjustedPosX] = useState(posX);
  const [adjustedPosY, setAdjustedPosY] = useState(posY);
  const [hoverScale, setHoverScale] = useState(1.28);

  useEffect(() => {
 if (windowWidth <= 668) {
      // setAdjustedPosX(0);
      // setAdjustedPosY(-0.4);
      // setScale(0.58);
      // setHoverScale(1.05); 
    } 
    else if (windowWidth <= 1268) {
      setAdjustedPosX(posX);
      setAdjustedPosY(posY);
        setScale(0.94);
        setHoverScale(1.05); 
    } else {
      setAdjustedPosX(posX);
      setAdjustedPosY(posY);
      setScale(initialScale);
      setHoverScale(1.08); 
    }
  }, [windowWidth, windowHeight, posX, posY, initialScale]);

  const lunarTexture = useMemo(() => {
    const texture = new THREE.TextureLoader().load(lunarLandscape);
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    return texture;
  }, []);

  const waterTexture = useMemo(() => {
    const texture = new THREE.TextureLoader().load(water);
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    return texture;
  }, []);

  const currentTexture = isDarkMode ? lunarTexture : waterTexture;

  const onFrame = useCallback(
    () => {
      // const t = clock.getElapsedTime();
      if (mesh.current.material instanceof THREE.ShaderMaterial) {
        const { uniforms } = mesh.current.material;
        if (uniforms.landscape) {
          uniforms.landscape.value = currentTexture;
        }
      }
      mesh.current.rotation.x = mesh.current.rotation.y += 0.001;
    },
    [currentTexture]
  );

  useFrame(({ pointer }) => {
    onFrame();

    const targetScale = hovered ? scale * hoverScale : scale;
    const meshScale = mesh.current.scale.x + (targetScale - mesh.current.scale.x) * 0.04;
    mesh.current.scale.set(meshScale, meshScale, meshScale);

    let positionX = adjustedPosX;
    let positionY = adjustedPosY;

    const x = pointer.x * viewport.width;
    const y = pointer.y * viewport.height;

    positionX += THREE.MathUtils.clamp(x / 200, -viewport.width / 2, viewport.width / 2);
    positionY += THREE.MathUtils.clamp(y / 200, -viewport.height / 2, viewport.height / 2);

    mesh.current.position.x += (positionX - mesh.current.position.x) * 0.50;
    mesh.current.position.y += (positionY - mesh.current.position.y) * 0.50;
  });

  

  return (
    <mesh
      onClick={toggleTheme} 
      ref={mesh}
      scale={[scale, scale, scale]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {isDarkMode ? (
        <>
          <icosahedronGeometry args={[2.8, 2]} />
          <shaderMaterial attach="material" args={[customShaders]} />
        </>
      ) : (
        <>
          <icosahedronGeometry args={[2.8, 2]} />
          <shaderMaterial attach="material" args={[customShaders]} />
        </>
      )}
    </mesh>
  );
}