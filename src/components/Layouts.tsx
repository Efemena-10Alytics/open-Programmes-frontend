// components/Layouts.tsx

import React, { ReactNode } from "react";
import FlashBanner from "./layout/FlashBanner";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";

type LayoutProps = {
  children: ReactNode;
};

export const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <FlashBanner />
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export const SimpleLayout: React.FC<LayoutProps> = ({ children }) => {
  return <>{children}</>;
};
