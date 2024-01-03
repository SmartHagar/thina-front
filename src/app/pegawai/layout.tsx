/** @format */

import HeaderComp from "@/components/header/HeaderComp";
import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";
import Auth from "./Auth";

type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Auth />
      <div className="sm:flex ml-64 hidden border-b border-menu-active h-12 items-center justify-center">
        <HeaderComp />
      </div>
      <Sidebar type="pegawai" />
      <div className="p-4 sm:ml-64">{props.children}</div>
    </div>
  );
};

export default layout;
