import React from "react";

interface Props {
  number: number;
  title: string;
  color: string;
  icon: string;
}
const QuickInfoCard = ({ title, number, icon, color }: Props) => {
  return (
    <div className="bg-white text-[#6D6D6D] rounded-[10px] p-3 flex gap-3 border border-[#EDEDED]">
      <div
        className="rounded-[4px] flex-[0.3] flex items-center justify-center gap-4"
        style={{ backgroundColor: color }}
      >
        <img src={icon} alt="" />
      </div>
      <div className="flex flex-col flex-[0.7]">
        <span className="text-[12px] font-light">{title}</span>
        <span className="text-[48px] font-bold">{number}</span>
      </div>
    </div>
  );
};

export default QuickInfoCard;
