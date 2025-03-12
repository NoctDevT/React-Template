import  { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${x}px`;
        cursorRef.current.style.top = `${y}px`;
      }
    };

    const enlargeCursor = () => {
      cursorRef.current?.classList.add('cursor-hover');
    };

    const shrinkCursor = () => {
      cursorRef.current?.classList.remove('cursor-hover');
    };

    const links = document.querySelectorAll('a');
    links.forEach((link) => {
      
      link.addEventListener('mouseenter', enlargeCursor);
      link.addEventListener('mouseleave', shrinkCursor);
    });

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      links.forEach((link) => {
        link.removeEventListener('mouseenter', enlargeCursor);
        link.removeEventListener('mouseleave', shrinkCursor);
      });
    };
  }, []);

  return createPortal(
    <div
      ref={cursorRef}
      className="fixed w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-in-out mix-blend-difference cursor"
    />,
    document.body
  );
};

export default Cursor;
