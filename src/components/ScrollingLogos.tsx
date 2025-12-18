import React, { useRef, useEffect } from "react";

const ScrollingLogos: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const logos = [
    "excel2.svg",
    "tableau2.svg",
    "python2.svg",
    "chatgpt2.svg",
    "trello2.svg",
    "power-bi2.svg",
    "looker2.svg",
    "lucidchart.svg",
    "jira2.svg",
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 1; // Adjust speed here
      if (scrollPosition >= scrollWidth / 3) {
        scrollPosition = 0;
      }
      scrollContainer.style.transform = `translateX(${-scrollPosition}px)`;
      requestAnimationFrame(scroll);
    };

    requestAnimationFrame(scroll);
  }, []);

  return (
    <div className="logo-container">
      <div className="logo-scroll" ref={scrollRef}>
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <img key={index} src={`svg/logos/${logo}`} alt="" className="logo" />
        ))}
      </div>
    </div>
  );
};

export default ScrollingLogos;
