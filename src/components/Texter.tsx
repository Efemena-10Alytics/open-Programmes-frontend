import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Get Trained", "Gain Skilled", "Get Hired"];

const WordAnimation: React.FC = () => {
  const [currentWord, setCurrentWord] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const updateWord = () => {
      indexRef.current = (indexRef.current + 1) % words.length;
      setCurrentWord(words[indexRef.current]);
    };

    intervalRef.current = setInterval(updateWord, 2000);
    updateWord(); // Call updateWord immediately to start the animation

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <span className="absolute min-h-min overflow-hidden">
      <AnimatePresence mode="wait">
        {currentWord && ( // Render the motion.span only if currentWord is not empty
          <motion.span
            key={currentWord}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%", opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              display: "inline-block",
            }}
          >
            {currentWord}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

export default WordAnimation;
