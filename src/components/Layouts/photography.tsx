import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../providers/themeProvider'; // Theme integration
import GlitchText from '../animatedComponents/GlitchText'; // For consistent styling

interface PhotographyLayoutProps {
    children: React.ReactNode;
    links: { label: string; path: string }[];
}

export const PhotographyLayout: React.FC<PhotographyLayoutProps> = ({
  children,
  links,
}) => {
  const { theme } = useTheme();  // Theme access
  const [bgClass, setBgClass] = useState("");

  useEffect(() => {
    setBgClass(
      theme === "dark"
        ? "bg-zinc-900 text-slate-300"
        : "bg-white text-gray-800"
    );
  }, [theme]);

  return (
    <div className={`relative flex flex-col min-h-screen transition-colors duration-500 overflow-hidden ${bgClass}`}>
      <header className="flex justify-between items-center p-8">
        <h1 className="text-5xl font-bold tracking-widest">VIVIENNE&TAMAS</h1>

        <nav className="flex space-x-6 uppercase text-sm tracking-wide">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="hover:text-gray-500 transition-transform ease-in-out duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-2 md:grid-cols-3 gap-4 p-8 w-full">
        {children}
      </main>

      <footer className="p-8 text-center text-xs text-gray-500">
        <GlitchText text="VIVIENNE&TAMAS Photography 2024" duration={9000} repeatDelay={10000} />
      </footer>
    </div>
  );
};

export default PhotographyLayout;
