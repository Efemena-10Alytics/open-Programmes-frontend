import React, { useState, useRef, useEffect } from "react";

interface AutoScrollingBoxesProps {
  duplicateCount: number;
  direction: "left" | "right";
  children: React.ReactNode;
  speed?: number; // seconds for one full scroll
}

const AutoScrollingBoxes: React.FC<AutoScrollingBoxesProps> = ({
  duplicateCount,
  direction,
  children,
  speed = 40,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const animationDirection = direction === "left" ? "normal" : "reverse";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - container.offsetLeft);
      setScrollLeft(container.scrollLeft);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, startX, scrollLeft]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const totalWidth = content.scrollWidth / duplicateCount;
    const animationDuration = `${speed}s`;
    content.style.setProperty("--scroll-width", `-${totalWidth}px`);
    content.style.setProperty("--scroll-time", animationDuration);
  }, [duplicateCount, speed, children]);

  const getAnimationClass = () => {
    if (isDragging || isPaused) return "";
    return "animate-scroll";
  };

  return (
    <div
      ref={containerRef}
      className="overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ touchAction: "pan-y" }}
    >
      <div
        ref={contentRef}
        className={`flex ${getAnimationClass()}`}
        style={{
          animationDirection,
          width: `${100 * duplicateCount}%`,
        }}
      >
        {[...Array(duplicateCount)].flatMap((_, index) =>
          React.Children.map(children, (child, childIndex) =>
            React.cloneElement(child as React.ReactElement, {
              key: `${index}-${childIndex}`,
            })
          )
        )}
      </div>
    </div>
  );
};

export default AutoScrollingBoxes;
