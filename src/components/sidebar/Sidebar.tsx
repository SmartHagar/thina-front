/** @format */
"use client";
import React, { FC, useEffect, useState } from "react";
import ListMenu, { pegawaiMenu } from "./ListMenu";
import Link from "next/link";
import { BsXLg } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import BtnDefault from "../button/BtnDefault";
import useLogout from "@/stores/auth/logout";
import MenuTypes from "@/types/MenuTypes";
import Cookies from "js-cookie";

type Props = {
  type?: "admin" | "pegawai";
};

const Sidebar: FC<Props> = ({ type = "admin" }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const route = useRouter();
  const [menus, setMenus] = useState<MenuTypes[]>([]);
  // store
  const { setLogout } = useLogout();

  // ketika pathname berubah
  useEffect(() => {
    setOpen(false);

    return () => {};
  }, [pathname]);
  // ketika type berubah
  useEffect(() => {
    if (type === "admin") {
      setMenus(ListMenu);
    } else {
      setMenus(pegawaiMenu);
    }
    return () => {};
  }, [type]);
  // ketika tombol burger di klik
  const handleBurger = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    const res = await setLogout();
    if (res?.status === "success") {
      // delete cookie
      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("pegawai");
      return route.push("/login");
    }
    console.log({ res });
  };
  return (
    <>
      <button
        onClick={handleBurger}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 ${
          open ? "translate-x-0" : ""
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-row-reverse justify-between sm:block">
          <div className="text-black sm:hidden" onClick={handleBurger}>
            <BsXLg />
          </div>
          <div className="relative h-full">
            <div className="h-24">Hallo</div>
            <ul className="space-y-2 font-medium">
              {menus &&
                menus.map((menu, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={menu.href}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        {menu.icon}
                        <span className="ms-3">{menu.name}</span>
                      </Link>
                    </li>
                  );
                })}
            </ul>
            <div className="absolute bottom-4 flex justify-center left-0 right-0">
              <BtnDefault addClass="bg-primary" onClick={handleLogout}>
                Logout
              </BtnDefault>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
