import { motion } from "framer-motion";

interface StaggeredTextProps {
    children: React.ReactNode;
    orientation?: "horizontal" | "vertical";
    delayFactor?: number; 
    baseDelay?: number; 
  }
  
  const StaggeredText: React.FC<StaggeredTextProps> = ({
    children,
    orientation = "horizontal",
    delayFactor = 0.1,
    baseDelay = 0, 
  }) => {
    const letterVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: baseDelay + delayFactor * index, 
        },
      }),
    };
  
    return (
      <motion.div
        className={`flex ${
          orientation === "vertical" ? "flex-col" : "flex-row"
        } items-center`}
        initial="hidden"
        animate="visible"
      >
        {children &&
          children
            .toString()
            .split("")
            .map((char, index) => (
              <motion.span
                key={index}
                className="inline-block"
                custom={index} 
                variants={letterVariants}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
      </motion.div>
    );
  };
  
  export default StaggeredText;
  