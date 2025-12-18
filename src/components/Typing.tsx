import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";

const AnimatedText = () => {
  const [text, setText] = useState("Fundamentals of Machine Learning...");
  const fullText = "Fundamentals of Machine Learning...";

  useEffect(() => {
    let currentIndex = text.length;
    const typingInterval = setInterval(() => {
      setText((prevText) => prevText + fullText.charAt(currentIndex));
      currentIndex++;
      if (currentIndex > fullText.length) {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  return (
    <div className="absolute h-[37px] lg:h-[47px] -left-[10px] lg:-left-[50px] bottom-[100px] lg:bottom-[160px] flex items-center shadow-lg">
      <div className="bg-[#FFFFFF] flex items-center px-4 rounded-tl-[10px] rounded-bl-[10px] h-full text-[10px] lg:text-[14px] text-[#333333] overflow-hidden container">
        <span className="animate-typing">{text}</span>
      </div>
      <div className="bg-black rounded-e-[10px] h-full w-[51px] flex items-center justify-center">
        <IoSearch className="text-white" />
      </div>
    </div>
  );
};

export default AnimatedText;
