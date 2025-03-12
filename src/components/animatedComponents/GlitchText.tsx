import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

interface GlitchTextProps {
  text: string;
  duration?: number;
  repeatDelay?: number;
  repeat?: boolean;
  delay?: number;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  duration = 5000,
  repeatDelay = 10000,
  repeat = true,
  delay = 0,
}) => {
  const [glitchedText, setGlitchedText] = useState(Array.from(text));

  useEffect(() => {
    // Glitch characters: choose a subset of Amharic characters
    const glitchCharacter = (char: string): string => {
      const glitchChars = ["ሀ", "ለ", "መ", "ሠ", "ቀ", "ነ", "አ", "ደ", "ገ", "ጠ", "&"];
      return Math.random() > 0.5 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char;
    };

    const glitchEffect = () => {
      const originalText = Array.from(text);
      let workingText = [...originalText];
      let currentIndex = 0;

      const glitchInterval = setInterval(() => {
        if (currentIndex < originalText.length) {
          for (let i = 0; i <= currentIndex; i++) {
            workingText[i] = glitchCharacter(originalText[i]);
          }
          setGlitchedText([...workingText]);
          currentIndex++;
        } else {
          clearInterval(glitchInterval);

          let restoreIndex = 0;
          const restoreInterval = setInterval(() => {
            if (restoreIndex < originalText.length) {
              workingText[restoreIndex] = originalText[restoreIndex];
              setGlitchedText([...workingText]);

              for (let i = restoreIndex + 1; i < originalText.length; i++) {
                workingText[i] = glitchCharacter(originalText[i]);
              }

              restoreIndex++;
            } else {
              clearInterval(restoreInterval);
            }
          }, duration / (originalText.length * 5));
        }
      }, duration / (originalText.length * 5));
    };

    const startTimeout = setTimeout(() => {
      glitchEffect();

      let repeatEffect: NodeJS.Timeout;
      if (repeat) {
        repeatEffect = setInterval(() => {
          glitchEffect();
        }, repeatDelay);
      }

      return () => clearInterval(repeatEffect);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, duration, repeatDelay, repeat, delay]);

  return (
    <motion.span
      className="relative block"
      initial={false}
      animate={{ opacity: [1, 0.9, 1], scale: [1, 1.02, 1] }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {glitchedText.join("")}
    </motion.span>
  );
};

export default GlitchText;
