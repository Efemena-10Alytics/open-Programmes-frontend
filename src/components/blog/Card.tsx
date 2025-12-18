import { ReactNode } from "react";

interface Card {
  heading: string;
  children: ReactNode;
}

const Card = ({ heading, children }: Card) => {
  return (
    <div className="bg-[#F9FAFB] border border-[#EEEEEE] rounded-[24px] px-3 py-5">
      <h2 className="text-[24px] text-[#333333] font-bold mb-2 pl-3">
        {heading}
      </h2>
      {children}
    </div>
  );
};

export default Card;
