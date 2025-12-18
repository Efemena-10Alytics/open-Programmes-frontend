import React, { ReactNode } from "react";

interface BorderedCardProps {
  children: ReactNode;
  label: ReactNode;
  heading: string;
}

const BorderedCard: React.FC<BorderedCardProps> = ({
  children,
  label,
  heading,
}) => {
  return (
    <div className="bg-white flex flex-col gap-3 rounded-[10px] border border-[#EDEDED] p-3">
      <div className="flex items-center justify-between">
        <div
          className="rounded-[4px] p-2"
          style={{ borderLeft: "2px solid #CA2421" }}
        >
          <span className="text-[#6D6D6D] text-[13px]">{heading}</span>
        </div>
        {label}
      </div>
      <div className="bg-[#F7F8FA] border-[0.9px] border-[#ECECEC] p-2 rounded-[10px]">
        {children}
      </div>
    </div>
  );
};

export default BorderedCard;
