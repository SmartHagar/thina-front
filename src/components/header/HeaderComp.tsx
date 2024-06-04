/** @format */
"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

type Props = {};

const HeaderComp = (props: Props) => {
  const [welcome, setWelcome] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/pegawai") {
      const dtPegawai = JSON.parse(Cookies.get("pegawai") || "");
      setWelcome(`Selamat Datang ${dtPegawai?.nama}`);
    } else {
      // split the pathname
      const path = pathname?.split("/");
      setWelcome(`Halaman ${path[path.length - 1]}`);
    }

    return () => {};
  }, [pathname]);

  return (
    <h3 className="capitalize text-center text-xl font-bold">{welcome}</h3>
  );
};

export default HeaderComp;
