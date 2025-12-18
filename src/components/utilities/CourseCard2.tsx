import Link from "next/link";
import SkillLabel from "./SkillLabel";

interface Props {
  img: string;
  name: string;
  description: string;
  price: number | string;
  link: string;
  skills: string[];
}
const CourseCard2 = ({
  name,
  img,
  description,
  price,
  link,
  skills,
}: Props) => {
  return (
    <div className="w-full flex flex-col justify-between border border-[#DDDDDD] rounded-[24px] p-2">
      <img src={img} alt="" className="rounded-[24px]" />
      <div>
        <h3 className="text-[#020202] text-[15px] font-bold mt-2">{name}</h3>
        <p className="text-[12px] text-[#5F5B5B] leading-5 mb-4">
          {description}
        </p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-dark text-[12px] font-bold">N{price}</span>
          <Link href={link} className="flex items-center gap-2">
            <span className="font-bold text-[12px]">Learn more</span>
            <img src="svg/arrow.svg" alt="" />
          </Link>
        </div>
        <div className="border border-[#DDDDDD] bg-[#FFFBFB] rounded-[12px] p-2">
          <h6 className="font-semibold text-[12px]  mb-3">
            Skills you will learn
          </h6>
          <div className="flex gap-1">
            {skills.map((skill, index) => {
              return (
                <div
                  key={index}
                  className="bg-[#020202] w-[65px] rounded-full p-1 flex items-center justify-center"
                >
                  <img src={skill} alt="" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard2;
