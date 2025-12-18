import React, { ReactNode } from "react";

interface Props {
  cta: ReactNode;
  img: string;
  title?: string;
  text: string;
}

const EmptyState = ({ cta, img, title, text }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-2">
      <img src={img} alt="" />
      <span>
        <h1 className="text-[#1E1E1E] text-[18px] font-semibold text-center">
          {title}
        </h1>

        <p className="text-[#BCBCBC] text-[14px] text-center">{text}</p>
      </span>

      {cta}
    </div>
  );
};

export default EmptyState;
