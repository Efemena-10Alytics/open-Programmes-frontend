"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  to: string;
  exact?: boolean;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  [key: string]: any;
}

export const NavLink: React.FC<NavLinkProps> = ({
  to,
  exact = false,
  children,
  className = "",
  activeClassName,
  ...props
}) => {
  const pathname = usePathname();
  
  // For Next.js, you need to handle the base path correctly
  const isActive = exact
    ? pathname === to
    : pathname?.startsWith(to);

  const defaultActiveClass = "font-extrabold text-white bg-[#FFFFFF24]";
  const finalActiveClass = activeClassName || defaultActiveClass;

  const finalClassName = `${className} ${
    isActive ? finalActiveClass : ""
  }`.trim();

  return (
    <Link href={to} {...props} className={finalClassName}>
      {children}
    </Link>
  );
};