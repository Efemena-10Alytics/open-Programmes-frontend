import { useState, useRef, useCallback } from "react";
import SkillLabel from "./SkillLabel";
import Link from "next/link";
interface Props {
  img: string;
  name: string;
  description: string;
  price: number | string;
  link: string;
  skills: string[];
}

const CourseCard = ({ name, img, description, price, link, skills }: Props) => {
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

  return (
    <div className="flex flex-col justify-between border border-[#DDDDDD] rounded-[24px] p-2">
      <img src={img} alt="" className="h-[267px] object-cover rounded-[24px]" />
      <div>
        <h3 className="text-[#020202] text-[20px] font-bold mt-2">{name}</h3>
        <p className="text-[14px] text-[#5F5B5B] font-light leading-5 mb-4">
          {description}
        </p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-dark text-[14px] font-bold">N{price}</span>
          <Link href={`/courses/${link}`} className="flex items-center gap-2">
            <span className="font-bold">Learn more</span>
            <img src="svg/arrow.svg" alt="" />
          </Link>
        </div>
        <div className="border border-[#DDDDDD] bg-[#FFFBFB] rounded-[12px] p-2">
          <h6 className="font-semibold text-[14px]  mb-3">
            Skills you will learn
          </h6>

          <div
            ref={containerRef}
            className="overflow-x-auto py-2 cursor-grab active:cursor-grabbing scrollbar-hide"
            onMouseDown={startDragging}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onMouseMove={onDrag}
          >
            <div className="flex gap-4 w-max">
              {skills.map((skill, index) => (
                <SkillLabel logoSrc={skill} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
