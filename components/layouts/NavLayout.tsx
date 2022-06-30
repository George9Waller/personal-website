import React from "react";
import Footer from "../common/Footer";
import NavBar from "../common/NavBar";

type NavLayoutProps = {
  children: React.ReactNode;
};

export const NavLayout = ({ children }: NavLayoutProps) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default NavLayout
