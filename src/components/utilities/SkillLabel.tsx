import React from "react";

interface Props {
  logoSrc: string;
}

const SkillLabel = ({ logoSrc }: Props) => {
  return (
    <div className="bg-[#020202] w-[70px] h-[33px] rounded-full p-2 flex items-center justify-center">
      <img src={logoSrc} alt="" className="w-[40px]" />
    </div>
  );
};

export default SkillLabel;
