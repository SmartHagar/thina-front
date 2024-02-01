/** @format */

import Image from "next/image";
import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="w-full">
      <h2 className="text-center">Halo... Selamat datang Admin</h2>
      <div className="h-24 mt-4">
        <Image
          src="/images/uogp.png"
          alt="logo"
          width={200}
          height={200}
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default Dashboard;
