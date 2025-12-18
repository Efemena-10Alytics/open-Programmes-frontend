import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  heading: string;
}

const Card: React.FC<CardProps> = ({ heading, children }) => {
  return (
    <div className="bg-white rounded-[10px] p-3 border border-[#EFEFEF]">
      <div>
        <div className="border border-[#F7F8FA] rounded-[10px]">
          <div className="bg-[#F7F8FA] rounded-t-[10px] text-[#6D6D6D] font-semibold text-[12px] p-2">
            {heading}
          </div>
          <div className="bg-white p-2">
            <div className="flex flex-col gap-2 bg-[#F7F8FA] rounded-[10px] border border-[#ECECEC] p-2">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
