/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import useJawaban from "@/stores/crud/Jawaban";
import React, { FC, useEffect, useState } from "react";

type Props = {
  dtJawaban: any;
};

const ShowData: FC<Props> = ({ dtJawaban }) => {
  console.log({ dtJawaban });
  return (
    <div className="flex-1 flex-col max-w-full h-full overflow-auto">
      <div className="my-4 border-b">
        <h1 className="text-center text-lg">
          Daftar pertanyaan dan jawaban anda.
        </h1>
      </div>
      {dtJawaban &&
        dtJawaban.map((item: any, index: number) => (
          <div key={item.id} className="mb-2">
            <div className="flex gap-x-3">
              <span>{index + 1}.</span>
              <span>{item.pertanyaan.tanya}</span>
            </div>
            <div className="ml-8">
              <span>Jawaban {item.rating}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ShowData;
