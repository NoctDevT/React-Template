import { useEffect, useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { usePrevious } from 'react-use';
import gsap from 'gsap';
import CarouselItem from './carouselItem';
import { lerp, getPiramidalIndex } from './util';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';
// import useDetectMobileBrowser from '../../../hooks/isMobileDevice';
import {isMobile} from 'react-device-detect';

const planeSettingsDesktop = {
  width: 36,
  height: 18.5,
  gap: -8.4,
};

const planeSettingsMobile = {
  width: 16, 
  height: 12.5, 
  gap: -6.0,
};

gsap.defaults({
  duration: 1.5,
  ease: 'power3.out',
});

const images = [
  { image: 'images/1.webp'  },
  // { image: 'images/2.webp'  },
  // { image: 'images/3.webp'  },
  { image: 'images/4.webp'  },
  // { image: 'images/5.JPG'   },
  { image: 'images/6.webp'  },
  // { image: 'images/7.JPG'   },
  { image: 'images/8.webp'  },
  // { image: 'images/9.JPG'   },  
  { image: 'images/10.webp' },
  { image: 'images/11.webp' },
  { image: 'images/12.webp' },
  { image: 'images/13.webp' },
  // { image: 'images/14.JPG'  },
  // { image: 'images/15.JPG'  },
];

export const Carousel = () => {
  const [$root, setRoot] = useState<THREE.Group | null>(null);
  const $post = useRef<any>(null);

  const [activePlane, setActivePlane] = useState<number | null>(null);
  const prevActivePlane = usePrevious(activePlane);
  const { viewport } = useThree();

  const planeSettings = isMobile ? planeSettingsMobile : planeSettingsDesktop;

  const progress = useRef<number>(0);
  const startX = useRef<number>(0);
  const isDown = useRef<boolean>(false);
  const speedWheel = 0.02;
  const speedDrag = -0.3;
  const oldProgress = useRef<number>(0);
  const speed = useRef<number>(0);
  const $items = useMemo<THREE.Object3D[] | null>(() => {
    if ($root) return $root.children as THREE.Object3D[];
    return null;
  }, [$root]);

  const displayItems = (item: THREE.Object3D, index: number, active: number) => {
    if (!$items) return;
    const piramidalIndex = getPiramidalIndex($items, active)[index];
    gsap.to(item.position, {
      x: (index - active) * (planeSettings.width + planeSettings.gap),
      y: $items.length * -0.1 + piramidalIndex * 0.1,
    });
  };

  useFrame(() => {
    progress.current = Math.max(0, Math.min(progress.current, 100));

    if (!$items) return;
    const active = Math.floor((progress.current / 100) * ($items.length - 1));
    $items.forEach((item, index) => displayItems(item, index, active));
    speed.current = lerp(
      speed.current,
      Math.abs(oldProgress.current - progress.current),
      0.1
    );

    oldProgress.current = lerp(oldProgress.current, progress.current, 0.1);

    if ($post.current) {
      $post.current.thickness = speed.current;
    }
  });

  const handleWheel = (e: ThreeEvent<WheelEvent>) => {
    if (activePlane !== null) return;
    const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
    const wheelProgress = isVerticalScroll ? e.deltaY : e.deltaX;
    progress.current = progress.current + wheelProgress * speedWheel;
  };

  const handleDown = (e: ThreeEvent<PointerEvent>) => {
    if (activePlane !== null) return;
    isDown.current = true;
    startX.current = e.clientX || 0;
  };

  const handleMove = (e: ThreeEvent<PointerEvent>) => {
    if (activePlane !== null || !isDown.current) return;
    const x = e.clientX || 0;
    const mouseProgress = (x - startX.current) * speedDrag;
    progress.current = progress.current + mouseProgress;
    startX.current = x;
  };

  const handleUp = (
    // e: ThreeEvent<PointerEvent>
  ) => {
    isDown.current = false;
  };

  useEffect(() => {
    if (!$items) return;
    if (activePlane !== null && prevActivePlane === null) {
      progress.current = (activePlane / ($items.length - 1)) * 100;
    }
  }, [activePlane, $items, prevActivePlane]);

  const renderPlaneEvents = () => {
    return (
      <mesh
        position={[0, 0, -0.01]}
        onWheel={handleWheel}
        onPointerDown={handleDown}
        onPointerUp={handleUp}
        onPointerMove={handleMove}
        onPointerLeave={handleUp}
        onPointerCancel={handleUp}
      >
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    );
  };

  const renderSlider = () => {
    return (
      <group ref={setRoot}>
        {images.map((item, i) => (
          <CarouselItem
            width={planeSettings.width}
            height={planeSettings.height}
            setActivePlane={setActivePlane}
            activePlane={activePlane}
            key={item.image}
            item={item}
            index={i}
          />
        ))}
      </group>
    );
  };

  return (
    <group>
      {renderPlaneEvents()}
      {renderSlider()}
    </group>
  );
};

export default Carousel;
