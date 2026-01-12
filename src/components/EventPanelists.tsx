"use client";
import { useState, useRef, useCallback } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const EventPanelists = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const startDragging = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  }, []);

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDrag = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !containerRef.current) return;
      e.preventDefault();
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      containerRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 231 + 16; // Width of one panel + gap
      if (direction === "left") {
        containerRef.current.scrollLeft -= scrollAmount;
      } else {
        containerRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <section
      id="panelist"
      className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-7 mb-[100px]"
    >
      <div className="flex flex-col gap-3 lg:flex-[0.4] text-[#333333]">
        <div className="flex items-center gap-1 mb-1">
          <span className="text-primary font-light">Event Speakers</span>
          <div className="h-1 border-b border-primary w-[132px]"></div>
        </div>
        <h3 className="text-[32px] font-semibold">Meet The Panelists</h3>
        <p className="font-light leading-5 mb-3 w-11/12">
          On-site registration may be available, but we encourage attendees to
          register online in advance to secure their spot.
        </p>

        <div className="flex items-center gap-1">
          <span
            onClick={() => scroll("left")}
            className="bg-primary h-[40px] w-[40px] flex items-center justify-center rounded-full text-[#FFFFFF] font-light cursor-pointer"
          >
            <FaArrowLeft />
          </span>
          <span
            onClick={() => scroll("right")}
            className="bg-primary h-[40px] w-[40px] flex items-center justify-center rounded-full text-[#FFFFFF] font-light cursor-pointer"
          >
            <FaArrowRight />
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-1 lg:flex-[0.6] w-10">
        <div
          ref={containerRef}
          className="overflow-x-auto py-2 cursor-grab active:cursor-grabbing scrollbar-hide"
          onMouseDown={startDragging}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onMouseMove={onDrag}
        >
          <div className="flex items-center gap-4 w-max">
            <div className="flex flex-col items-center gap-2">
              <img
                src="img/speaker3.png"
                alt=""
                className="w-[231px] rounded-[48px]"
              />
              <div className="flex flex-col items-center">
                <span className="text-[#333333] text-[18px] font-semibold leading-6">
                  Muhammed Suleman
                </span>
                <span className="text-[#828282] text-[12px] font-light">
                  COO, 10Alytics Business
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img
                src="img/speaker2.png"
                alt=""
                className="w-[231px] rounded-[48px]"
              />
              <div className="flex flex-col items-center">
                <span className="text-[#333333] text-[18px] font-semibold leading-6">
                  Chukwuemeka
                </span>
                <span className="text-[#828282] text-[12px] font-light">
                  CEO, 10Alytics Business
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img
                src="img/speaker1.png"
                alt=""
                className="w-[231px] rounded-[48px]"
              />
              <div className="flex flex-col items-center">
                <span className="text-[#333333] text-[18px] font-semibold leading-6">
                  Yole Dior
                </span>
                <span className="text-[#828282] text-[12px] font-light">
                  MD, Fushure Consulting
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img
                src="img/speaker4.png"
                alt=""
                className="w-[231px] rounded-[48px]"
              />
              <div className="flex flex-col items-center">
                <span className="text-[#333333] text-[18px] font-semibold leading-6">
                  Peter Ebuka Agbo
                </span>
                <span className="text-[#828282] text-[12px] font-light">
                  Founder, HireRite Services
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventPanelists;
