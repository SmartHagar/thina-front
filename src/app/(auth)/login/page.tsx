/** @format */

import React from "react";
import Form from "./Form";
import Image from "next/image";

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h5 className="text-center">Selamat Datang</h5>
        <h4 className="text-center">Website Penilaian Kinerja Pegawai</h4>
        <h4 className="text-center">Metode SWOT</h4>
        <h5 className="text-center">Universitas Ottow Geissler</h5>
        <div className="my-4">
          <Image
            src="/images/uogp.png"
            alt="logo"
            width={70}
            height={100}
            className="mx-auto"
          />
        </div>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <Form />
        </div>
        <div className="py-5">
          <div className="grid grid-cols-2 gap-1">
            <div className="text-center sm:text-left whitespace-nowrap">
              <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block align-text-top"
                ></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
