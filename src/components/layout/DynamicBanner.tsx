import React from "react";
import Link from "next/link";

interface Props {
  header: string;
  links: { text: string; to: string }[];
  img: string;
}

const DynamicBanner = ({ header, links, img }: Props) => {
  return (
    <section className="bg-black flex items-center justify-between mx-auto mt-2 mb-[60px] pt-3 pr-9 text-white rounded-[14px]">
      <div className="flex flex-col gap-4 p-[20px] lg:pl-[40px]">
        <h1 className="text-[28px] lg:text-[32px] font-bold leading-[34px] lg:leading-[40px]">
          {header}{" "}
        </h1>
        <div>
          {links.map((link, i) => {
            return (
              <React.Fragment key={i}>
                <Link href={link.to} className={`${i === 1 && "font-semibold"}`}>
                  {link.text}
                </Link>
                {i < links.length - 1 && <span className="mx-2">&gt;</span>}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <img
        src={img}
        alt=""
        className="hidden lg:inline-block pt-[15px] pr-[15px]"
      />
    </section>
  );
};

export default DynamicBanner;
