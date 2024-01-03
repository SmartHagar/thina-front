/** @format */
"use client";
import useLogin from "@/stores/auth/login";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import Cookies from "js-cookie";
import LoadingSpiner from "@/components/loading/LoadingSpiner";

type Props = {};

const Auth: FC<Props> = (props: Props) => {
  // state
  const [isLoading, setIsLoading] = useState(true);
  // pathname
  const pathname = usePathname();
  // route
  const route = useRouter();
  const { cekToken } = useLogin();
  const getCek = async () => {
    const res = await cekToken();
    if (res?.error) {
      // redirect to login
      route.push("/login");
    } else {
      const role = Cookies.get("role");
      if (role !== "admin") {
        route.push(`/${role}`);
      }
    }
    return res;
  };

  useEffect(() => {
    getCek();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const loadData = async () => {
    const cek = await getCek();
    if (!cek?.error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    console.log("pertama render");
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen h-screen justify-center items-center">
        <LoadingSpiner />
      </div>
    );
  }
};

export default Auth;
