import React from "react";

interface Props {
  text: string;
  classNames?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = ({ text, classNames, type }: Props) => {
  return (
    <button
      className={`btn-gradient rounded-[10px] text-sm lg:text-[16px] text-white p-3 ${classNames}`}
      type={type}
      // style={{
      //   background:
      //     "linear-gradient(0deg, #000000, #000000), linear-gradient(90deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0) 100%)",
      // }}
    >
      {text}
    </button>
  );
};

export default Button;
