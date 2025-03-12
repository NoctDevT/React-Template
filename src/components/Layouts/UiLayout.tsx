import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { AiOutlineArrowRight } from "react-icons/ai";
import { useTheme } from "../../providers/themeProvider";
import { motion } from "framer-motion";
import GlitchText from "../animatedComponents/GlitchText";
import StaggeredText from "../../components/animatedComponents/staggeredText";
import { isMobile } from "react-device-detect";
import { FaRegMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";


import {Button} from "@heroui/react";

interface UiLayoutProps {
  links: { label: string; path: string }[];
  children: React.ReactNode;
  brandName: string;
}

function ThemeToggle () {
  const {theme, toggleTheme} = useTheme();
  return(
    <Button isIconOnly aria-label="ThemeToggle"  onClick={toggleTheme}>
       { theme === 'light' ?  <FaRegMoon  /> : <FiSun/> }  
    </Button>    
  )
}


export const UiLayout: React.FC<UiLayoutProps> = ({
  links,
  children,
  brandName,
}) => {
  // const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const [bgClass, setBgClass] = useState("");

  useEffect(() => {
    setBgClass(
      theme === "dark"
        ? "bg-zinc-900 text-slate-300"
        : "bg-white text-gray-800"
    );
  }, [theme]);

  
  // const toggleToolbar = () => {
  //   setIsOpen(!isOpen);
  // };


  // const getUrlLinks = () : string => {
  //   return "/home"
  // }


  return (
    <div
      className={`relative flex flex-col items-center justify-center min-h-[100dvh] transition-colors duration-500 overflow-hidden ${bgClass}`}
    >
      <motion.header className="absolute top-8 left-8 right-8 flex justify-between items-center">
        <motion.div className="font-departure text-md">
          <GlitchText text={brandName} repeat={false}/>
        </motion.div>

      <div className="flex items-center space-x-6">
        <motion.nav className={`flex items-center space-x-6 text-md
          
          ${isMobile ? `text-xs` :  `test-md`}`}>
          {links.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className="hover:scale-125 font-departure font-light transition-transform ease-in-out delay-350"
            >
                <StaggeredText delayFactor={0.2} baseDelay={index * 0.5}>
                  {link.label}
                </StaggeredText>
            </Link>
          ))}
          <ThemeToggle/>
        </motion.nav>
        </div>
      </motion.header>

      <motion.footer className="absolute font-departure bottom-8 left-8 text-xs text-gray-600">
        <GlitchText text="WEB DEVELOPER" duration={9000} repeatDelay={10000} />
        <GlitchText text="PHOTOGRAPHER" duration={9000} repeatDelay={10000} />
        <GlitchText text="PORTFOLIO 2024" duration={9000} repeatDelay={10000} />
      </motion.footer>

      <motion.div className="absolute bottom-8 right-8 flex flex-col items-end text-2xl text-gray-600">
        <p className="text-lg opacity-90">AutDev</p>
        <p className="text-xs opacity-70 mt-1">Built with Three.JS,React &</p>
        <p className="text-xs opacity-70 mt-1"> TypeScript</p>

      </motion.div>

      <motion.main className="flex-1 w-full m-24">{children}</motion.main>
    </div>
  );
};

export default UiLayout;
