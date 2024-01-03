/** @format */
"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const HeaderComp = (props: Props) => {
  const [welcome, setWelcome] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    console.log({ pathname });
    if (pathname === "/pegawai") {
      setWelcome("Selamat Datang di Halaman Pegawai");
    } else {
      // split the pathname
      const path = pathname?.split("/");
      console.log({ path });
      setWelcome(`Halaman ${path[path.length - 1]}`);
    }

    return () => {};
  }, [pathname]);

  return (
    <h3 className="capitalize text-center text-xl font-bold">{welcome}</h3>
  );
};

export default HeaderComp;
