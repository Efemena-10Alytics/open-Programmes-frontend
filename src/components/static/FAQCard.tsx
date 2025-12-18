"use client";

import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface Props {
  question: string;
  answer: string;
}

const FAQCard = ({ question, answer }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-[#D0D5DD] rounded-[24px]">
      <div
        className={`flex justify-between items-center pb-4 lg:pb-6 ${
          isOpen && "border-b pb-4"
        } p-4`}
      >
        <h4
          className="text-[18px] lg:text-[20px] leading-[30px] font-bold lg:font-extrabold"
          onClick={() => setIsOpen(!isOpen)}
        >
          {question}
        </h4>
        {isOpen ? (
          <IoIosArrowDown
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer text-xl text-[#141B34]"
          />
        ) : (
          <IoIosArrowUp
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer text-xl text-[#141B34]"
          />
        )}
      </div>
      {isOpen && (
        <p className="font-light text-[#344054] text-[16px] lg:text-[18px] leading-7 p-3">
          {answer}
        </p>
      )}
    </div>
  );
};

export default FAQCard;
