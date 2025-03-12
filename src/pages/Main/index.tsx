import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Noise, ChromaticAberration, EffectComposer as PostProcessComposer, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { IcosahedronGeometry } from '../../components/three-js-components/icosahedronShape';
import { useTheme } from '../../providers/themeProvider';
import Typewriter from 'typewriter-effect';
import { FaGithub, FaTwitter } from 'react-icons/fa';

const AboutPage: React.FC = () => {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  const [showGithubLink, setShowGithubLink] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Canvas flat shadows linear>
            <PostProcessComposer>
              <Noise opacity={0.28} />
              <ChromaticAberration
                blendFunction={BlendFunction.MULTIPLY}
                offset={new THREE.Vector2(0.05, 0.05)}
                radialModulation={true}
                modulationOffset={0.71}
              />
              <ChromaticAberration
                blendFunction={theme === 'light' ? BlendFunction.NORMAL : BlendFunction.INVERT_RGB}
                offset={new THREE.Vector2(0.0, 0.0)}
                radialModulation={true}
                modulationOffset={0.01}
              />
              <Bloom
                blendFunction={BlendFunction.ADD}
                intensity={1.2}
                luminanceThreshold={0.5}
                luminanceSmoothing={0.2}
              />
            </PostProcessComposer>
            <IcosahedronGeometry posX={1.8} posY={0} scale={0.85} />
          </Canvas>
        </Suspense>
      </div>

      <div
        className="absolute top-[5%] sm:top-[30%] left-1/2 transform 
        -translate-x-1/2 sm:left-[15%] tracking-wider sm:transform-none sm:text-left
        md:left-[8%]"
      >
        <div className="flex flex-col text-left mt-16 md:mt-0 space-y-4">

          <h1 className="text-3xl text-gray-800 md:text-6xl lg:text-6xl text-center md:text-left font-bold leading-tight dark:text-gray-100">
            <Typewriter
              options={{
                delay: 60,
                deleteSpeed: 20
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString('Beyond Software')
                  .pauseFor(700)
                  .typeString('<br/>Paving the way for your <br/> next project')
                  .pauseFor(1000)
                  .deleteChars(7)
                  .pauseFor(500)
                  .typeString('<span class="gold-wave">experience</span>')
                  .callFunction(() => setTimeout(() => setShowParagraph(true), 1000))
                  .start();
              }}
            />
          </h1>

          {showParagraph && (
            <>
              <p className="text-base md:text-lg dark:text-gray-000 text-white md:text-gray-900 text-center md:text-left">
                <Typewriter
                  options={{ delay: 40 }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(
                        `<span class="${isMobile ? 'white-text' : 'gradient-wave-text'}">Web Developer and Photographer</span>`
                      )
                      .callFunction(() => setTimeout(() => setShowGithubLink(true), 1000))
                      .start();
                  }}
                />
              </p>
              {showGithubLink && (
                <div className="flex items-center gap-2 mt-4 text-gray-500 justify-center md:justify-start">
                  <a
                    href="https://github.com/NoctDevT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dark:text-white text-gray-800 hover:text-gray-500 dark:hover:text-gray-500 transition"
                  >
                    <FaGithub size={24} />
                  </a>
                  <a
                    href="https://substack.com/@autumnxv" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dark:text-white text-gray-800 hover:text-gray-500 dark:hover:text-gray-500 transition"
                  >
                    <FaTwitter size={24} />
                  </a>
                </div>
              )}

            </>
          )}

          <p className="text-xs tracking-normal md:text-sm dark:text-gray-500 text-gray-800"></p>
        </div>
      </div>

      <style>
        {`
          .white-text {
            color: white;
          }

         .gold-wave {
          background: linear-gradient(
              to right,
              #00FFFF 0%,       /* Neon Blue */
              #FFD700 50%,      /* Gold Midpoint */
              #00FFFF 100%      /* Neon Blue End */
          );
          
          background-size: 200% 100%;   
          background-position: 100% 0; 
          
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;

          animation: wave 10.5s infinite ease-in-out;
      }

      @keyframes wave {
          0% { background-position: 100% 0; }   
          30% { background-position: 0 0; }     
          50% { background-position: 0 0; }     
          80% { background-position: 120% 0; }  
          100% { background-position: 150% 0; } 
      }

          .gradient-wave-text {
            background: linear-gradient(
              90deg,
              #444444,
              #555555,
              #777777
            );
            background-size: 400% 400%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientWave 4s ease infinite;
          }

          @keyframes gradientWave {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AboutPage;
