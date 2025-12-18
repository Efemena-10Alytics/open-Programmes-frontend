"use client";

import React, { ReactNode } from "react";
import Button from "./utilities/Button";
import FAQCard from "./static/FAQCard";
import Link from "next/link";

interface Props {
  children: ReactNode;
  // heading: string;
}

const FAQsSection = ({ children }: Props) => {
  return (
    <section className="w-11/12 mx-auto flex flex-wrap justify-between gap-6 pt-[40px] pb-[80px]">
      <div className="lg:flex-[0.35]">
        <div className=" bg-[#FFEFEF] w-fit lg:w-[182px] mb-4 px-4 py-2 lg:p-3 text-[12px] lg:text-[14px] text-primary flex justify-center items-center rounded-full">
          Enrollment FAQs
        </div>
        <div className="flex flex-col gap-5 items-start">
          <h2 className="text-[32px] font-bold leading-[40px] text-dark">
            Frequently Asked Question
          </h2>
          <p className="text-[#1D2939] leading-6">
            Whether you&apos;re curious about course content, pricing, or career
            support, our FAQ aims to address all your concerns. If you need
            further assistance, our support team is always here to help. Go to
            Contact Page
          </p>
          <Link href="/signup">
            <Button text="Get Started" classNames="w-fit lg:w-[172px]" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-5 lg:flex-[0.65]">{children}</div>
    </section>
  );
};

export default FAQsSection;
