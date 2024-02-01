/** @format */
"use client";
import React, { FC, useEffect, useState } from "react";
import hitungRating from "./hitungRating";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import Total from "./Total";

type Props = {
  dataTable: any;
  dtPertanyaan: any;
};

const Rating: FC<Props> = ({ dataTable, dtPertanyaan }) => {
  // state
  const [dtRataRata, setDtRataRata] = useState<any>([]);
  const [totalBobot, setTotalBobot] = useState<any>([]);
  const [dtBXR, setDtBXR] = useState<any>([]);
  // effect
  useEffect(() => {
    const rataRata = hitungRating(dataTable, dtPertanyaan);
    setDtRataRata(rataRata?.rataRata);
    setTotalBobot(rataRata?.bobotIndikator);
    setDtBXR(rataRata?.bxrIndikator);
    return () => {};
  }, [dataTable, dtPertanyaan]);

  if (dataTable.length === 0) {
    return (
      <>
        <h1>Tidak ada data</h1>
      </>
    );
  }

  const renderData = (indikator1: string, indikator2: string) => {
    return dtPertanyaan
      .filter(
        (tanya: any) =>
          tanya.indikator === indikator1 || tanya.indikator === indikator2
      )
      .map((tanya: any, index: number) => {
        return (
          <div key={index} className="flex flex-col">
            {/* table */}
            <div className="flex flex-col mb-10">
              {/* rating */}
              <div className="mb-2">
                <h4>{tanya.indikator}</h4>
                <h4>Rating Jawaban</h4>
                <table className="w-full border-collapse border text-left">
                  <thead className="">
                    <tr className="bg-gray-100">
                      <th scope="col" className={`px-6 py-2 border`}>
                        No
                      </th>
                      {dataTable &&
                        dataTable.map((item: any, index: number) => (
                          <th
                            key={item.id}
                            scope="col"
                            className={`px-6 py-2 border`}
                          >
                            R{index + 1}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 border-t border-gray-100 ">
                    {tanya.pertanyaan.map((row: any, index: number) => (
                      <tr key={index}>
                        <td className={`px-6 py-2 whitespace-nowrap border`}>
                          {index + 1}
                        </td>
                        {dataTable &&
                          dataTable.map((item: any) =>
                            item.jawaban
                              .filter(
                                (jawaban: any) =>
                                  jawaban.pertanyaan.id === row.id
                              )
                              .map((item: any) => (
                                <td
                                  key={item.id}
                                  className={`px-6 py-2 whitespace-nowrap border`}
                                >
                                  {item.rating}
                                </td>
                              ))
                          )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* perhitungan */}
              <div>
                <table className="w-full border-collapse border text-left">
                  <thead className="">
                    <tr className="bg-gray-100">
                      <th className={`px-6 py-2 whitespace-nowrap border`}>
                        No
                      </th>
                      <th className={`px-6 py-2 whitespace-nowrap border`}>
                        Rata-rata
                      </th>
                      <th className={`px-6 py-2 whitespace-nowrap border`}>
                        Bobot
                      </th>
                      <th className={`px-6 py-2 whitespace-nowrap border`}>
                        BXR
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 border-t border-gray-100 ">
                    {tanya.pertanyaan.map((row: any, index: number) => (
                      <tr key={index}>
                        <td className={`px-6 py-2 whitespace-nowrap border`}>
                          {index + 1}
                        </td>
                        {/* Rata-rata */}
                        {dtRataRata &&
                          dtRataRata
                            .filter(
                              (item: any) => item.pertanyaan_id === row.id
                            )
                            .map((item: any) => (
                              <td
                                key={item.pertanyaan_id}
                                className={`px-6 py-2 whitespace-nowrap border`}
                              >
                                {item.average}
                              </td>
                            ))}
                        {/* Bobot */}
                        {dtRataRata &&
                          dtRataRata
                            .filter(
                              (item: any) => item.pertanyaan_id === row.id
                            )
                            .map((item: any) => (
                              <td
                                key={item.pertanyaan_id}
                                className={`px-6 py-2 whitespace-nowrap border`}
                              >
                                {item.bobot.toFixed(2)}
                              </td>
                            ))}
                        {/* BXR */}
                        {dtRataRata &&
                          dtRataRata
                            .filter(
                              (item: any) => item.pertanyaan_id === row.id
                            )
                            .map((item: any) => (
                              <td
                                key={item.pertanyaan_id}
                                className={`px-6 py-2 whitespace-nowrap border`}
                              >
                                {item.bxr.toFixed(2)}
                              </td>
                            ))}
                      </tr>
                    ))}
                    <tr>
                      <td
                        colSpan={2}
                        className={`px-6 py-2 whitespace-nowrap border`}
                      >
                        Total
                      </td>
                      {totalBobot &&
                        totalBobot
                          .filter(
                            (item: any) => item.indikator === tanya.indikator
                          )
                          .map((item: any) => (
                            <td
                              key={item.indikator}
                              className={`px-6 py-2 whitespace-nowrap border`}
                            >
                              {item.bobot}
                            </td>
                          ))}
                      {dtBXR &&
                        dtBXR
                          .filter(
                            (item: any) => item.indikator === tanya.indikator
                          )
                          .map((item: any) => (
                            <td
                              key={item.indikator}
                              className={`px-6 py-2 whitespace-nowrap border`}
                            >
                              {item.bxr}
                            </td>
                          ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* internal */}
      <div>
        <h3>IFAS (Internal Factor Analysis Strategy)</h3>
        {renderData("Kekuatan", "Kelemahan")}
      </div>
      <div>
        <h3>EFAS (External Factor Analysis Strategy)</h3>
        {renderData("Peluang", "Ancaman")}
      </div>
      <div>
        <Total dtTotal={dtBXR} />
      </div>
    </div>
  );
};

export default Rating;
