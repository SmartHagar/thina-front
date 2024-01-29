/** @format */
import NavbarComp from "@/components/navbar/NavbarComp";
import React from "react";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  redirect("/login");
  return (
    <div className="bg-white min-h-screen">
      <NavbarComp />
      <div className="max-w-screen-xl mx-auto flex flex-col pt-24">
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default layout;
