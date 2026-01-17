"use client";
import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaFacebookSquare } from "react-icons/fa";
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaLinkedin,
} from "react-icons/fa6";
import Button from "../utilities/Button";
import useCourses from "../../hooks/api/useCourses";
import api from "../../lib/api";
import { BlogModel } from "../../types";
import Logo from "../10alytics";


// ... existing code ...

const Footer = () => {
  const { courses } = useCourses();

  // ... existing code ...

  return (
    <footer className="bg-[#0B0D0F] text-white border-t-[8px] border-primary">
      <div className="w-11/12 mx-auto py-[50px]">

        {/* ... existing code ... */}

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <div className="hidden lg:inline-block">
            <Logo color="#FFFFFF" />
          </div>

          <div className="flex items-center gap-10 mt-4 lg:mt-0">
            <Link
              href="https://wa.me/2347042351981"
              className="hidden lg:inline-flex"
            >
              Developer
            </Link>
            <Link href="">Terms & Condition</Link>
            <Link href="">Policy Policy</Link>
            <img
              src="svg/nigerian-flag.svg"
              alt=""
              className="hidden lg:inline-flex"
            />
          </div>
        </div>
        <Link href="" className="lg:hidden inline-flex my-2">
          Developer
        </Link>
        <div className="lg:hidden block">
          <Logo color="#FFFFFF" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;