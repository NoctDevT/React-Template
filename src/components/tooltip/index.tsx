import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  keyword: string;
  description: string;
  colour : string;
  linkColor: string
}

const Tooltip: React.FC<TooltipProps> = ({ keyword, description, colour, linkColor }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const tooltipWidth = tooltipRef.current?.offsetWidth || 0;

    setPosition({
      x: e.clientX - tooltipWidth / 2,
      y: e.clientY
    });
  };

  return (
    <span
      className={`relative group cursor-pointer ${linkColor} underline decoration-underline`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {keyword}

      <AnimatePresence>
        {visible && (
          <motion.div
            ref={tooltipRef}
            className={`fixed z-[9999] px-4 py-2 ${colour} text-white bold text-sm rounded-xl shadow-lg drop-shadow-md`}
            style={{
              top: position.y - 58,
              left: position.x
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {description}
            <div
              className={`absolute w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-pink-300`}
              style={{
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default Tooltip;
