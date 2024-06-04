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
  // state
  const [sortJawaban, setSortJawaban] = useState<any>([]);
  const customOrder = ["Kekuatan", "Kelemahan", "Peluang", "Ancaman"];

  //  olah dtJawaban
  const olahJawaban = () => {
    const sortedJawaban = dtJawaban
      .slice()
      .sort(
        (a: any, b: any) =>
          customOrder.indexOf(a.pertanyaan.indikator) -
          customOrder.indexOf(b.pertanyaan.indikator)
      );

    console.log({ sortedJawaban });

    setSortJawaban(sortedJawaban);
  };

  useEffect(() => {
    olahJawaban();

    return () => {};
  }, [dtJawaban]);

  console.log({ sortJawaban });
  return (
    <div className="flex-1 flex-col max-w-full h-full overflow-auto">
      <div className="my-4 border-b">
        <h1 className="text-center text-lg">
          Daftar pernyataan dan jawaban anda.
        </h1>
      </div>
      {sortJawaban &&
        sortJawaban.map((item: any, index: number) => (
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
