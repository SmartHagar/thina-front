/** @format */

import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <div className="p-4 sm:ml-64">{props.children}</div>
    </div>
  );
};

export default layout;
