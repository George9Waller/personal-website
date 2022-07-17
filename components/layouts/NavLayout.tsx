import React from "react";
import Footer from "../common/Footer";
import NavBar from "../common/NavBar";

type NavLayoutProps = {
  children: React.ReactNode;
};

export const NavLayout = ({ children }: NavLayoutProps) => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <NavBar />
      <main className="mb-auto grow">{children}</main>
      <Footer />
    </div>
  );
};

export default NavLayout
