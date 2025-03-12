import { useEffect, useRef, useState } from 'react';
import { useThree, ThreeEvent } from '@react-three/fiber';
import gsap from 'gsap';
import Plane from './Plane';
import * as THREE from 'three';

interface CarouselItemProps {
  index: number;
  width: number;
  height: number;
  setActivePlane: (index: number | null) => void;
  activePlane: number | null;
  item: { image: string };
}

const CarouselItem: React.FC<CarouselItemProps> = ({
  index,
  width,
  height,
  setActivePlane,
  activePlane,
  item,
}) => {
  const $root = useRef<THREE.Group>(null);
  const [hover, setHover] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isCloseActive, setCloseActive] = useState(false);
  const { viewport } = useThree();
  const timeoutID = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (activePlane === index) {
      setIsActive(true);
      setCloseActive(true);
    } else {
      setIsActive(false);
    }
  }, [activePlane, index]);

  useEffect(() => {
    if (!$root.current) return;

    gsap.killTweensOf($root.current.position);
    gsap.to($root.current.position, {
      z: isActive ? 0 : -0.01,
      duration: 0.2,
      ease: 'power3.out',
      delay: isActive ? 0 : 2,
    });
  }, [isActive]);

  useEffect(() => {
    if (!$root.current) return;

    const hoverScale = hover && !isActive ? 0.8 : 0.6;
    gsap.to($root.current.scale, {
      x: hoverScale ,
      y: hoverScale,
      duration: 0.5,
      ease: 'power3.out',
    });
  }, [hover, isActive]);

  const handleClose = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation(); 
    if (!isActive) return;

    setActivePlane(null);
    setHover(false);
    if (timeoutID.current) clearTimeout(timeoutID.current);
    timeoutID.current = setTimeout(() => {
      setCloseActive(false);
    }, 1500);
  };

  return (
    <group
      ref={$root}
      position={[20,0,0.1]}
      onClick={() => setActivePlane(index)}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <Plane width={width} height={height} texture={item.image} active={isActive} />

      {isCloseActive ? (
        <mesh position={[0, 0, 0.01]} onClick={handleClose}>
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial transparent opacity={0} color="red" />
        </mesh>
      ) : null}
    </group>
  );
};

export default CarouselItem;
