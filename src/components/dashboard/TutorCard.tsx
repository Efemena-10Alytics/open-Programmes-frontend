import React from "react";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";

interface Props {
  name: string;
  role: string;
}

const TutorCard = ({ name, role }: Props) => {
  return (
    <div className="relative w-full flex flex-col items-center gap-3 border border-[#CCCCCC] text-[#6D6D6D] text-[13px] rounded-[10px] px-4 py-8">
      <img
        src="/svg/dots.svg"
        alt=""
        className="absolute top-3 right-3 cursor-pointer"
      />
      <img
        src="/img/dp2.png"
        alt=""
        className="w-[114px] h-[114px] rounded-full"
      />
      <div className="flex flex-col justify-center text-center">
        <span className="text-[#333333] font-semibold text-[16px]">{name}</span>
        <span>{role}</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="h-[40px] flex items-center gap-2 border border-[#D8D8D8] rounded-[8px] py-2 px-4">
          <FiPhone />
          <span>Book Call</span>
        </button>
        <button className="h-[40px] flex items-center gap-2 border border-[#D8D8D8] rounded-[8px] py-2 px-4">
          <MdOutlineEmail />
          <span>Email</span>
        </button>
      </div>
    </div>
  );
};

export default TutorCard;
