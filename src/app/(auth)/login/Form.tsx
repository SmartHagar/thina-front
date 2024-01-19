/** @format */
"use client";
import BtnDefault from "@/components/button/BtnDefault";
import InputTextDefault from "@/components/input/InputTextDefault";
import useLogin from "@/stores/auth/login";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";

type Props = {};

type Inputs = {
  email: string;
  password: string;
};

const Form = (props: Props) => {
  // store
  const { setLogin, cekToken } = useLogin();
  const router = useRouter();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // jika sudah login
  const fetchAuth = async () => {
    const token = Cookies.get("token");
    if (token) {
      const cekAuth = await cekToken();
      // console.log({ cekAuth });
      if (!cekAuth?.error) {
        const role = cekAuth?.data?.role;
        // redirect to login
        router.push(`/${role}`);
      }
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchAuth();
    }
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (row) => {
    setIsLoading(true);
    setError("");
    const res = await setLogin(row);
    if (res?.error) {
      console.log(res?.error);
      setError(res?.error?.message);
    } else {
      const { data } = res;
      Cookies.set("token", data.token);
      Cookies.set("role", data.role);
      // cek jika data pagawai ada
      if (data?.pegawai) {
        // convert json
        const pegawai = JSON.stringify(data.pegawai);
        console.log({ pegawai });
        Cookies.set("pegawai", pegawai);
      }
      router.push(`/${data.role}`);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="px-5 py-7">
      {error && <p className="text-red-600 text-center">{error}</p>}
      <form action="">
        <div className="pb-2 pt-4">
          <InputTextDefault
            label="Email"
            register={register}
            type="text"
            name="email"
            placeholder="Email"
            required
            errors={errors.email}
          />
        </div>
        <div className="pb-2 pt-4">
          <InputTextDefault
            label="Password"
            register={register}
            type="password"
            name="password"
            placeholder="Password"
            required
            errors={errors.email}
          />
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            onClick={handleSubmit(onSubmit)}
          >
            <span className="inline-block mr-2">Login</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
