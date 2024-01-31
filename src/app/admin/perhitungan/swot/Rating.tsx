/** @format */
"use client";
import React, { FC, useEffect } from "react";
import hitungRating from "./hitungRating";

type Props = {
  dataTable: any;
  dtPertanyaan: any;
};

const Rating: FC<Props> = ({ dataTable, dtPertanyaan }) => {
  useEffect(() => {
    hitungRating(dataTable);

    return () => {};
  }, [dataTable]);

  return (
    <>
      {/* internal */}
      <div>
        <h2>Internal</h2>
        {dtPertanyaan
          .filter(
            (tanya: any) =>
              tanya.indikator === "Kekuatan" || tanya.indikator === "Kelemahan"
          )
          .map((tanya: any, index: number) => {
            return (
              <div key={index}>
                <h1>{tanya.indikator}</h1>
                <table className="w-full border-collapse border text-left">
                  <thead className="">
                    <tr className="bg-gray-100">
                      <th>Pertanyaan</th>
                      {dataTable &&
                        dataTable.map((item: any, index: number) => (
                          <th key={item.id}>R{index + 1}</th>
                        ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 border-t border-gray-100 ">
                    {tanya.pertanyaan.map((item: any, index: number) => (
                      <tr key={index}>
                        <td>{item.tanya}</td>
                        {dataTable &&
                          dataTable.map((item: any) => (
                            <td key={item.id}>{item.jawaban[index].rating}</td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
      </div>
      {/* external */}
      <div>
        <h2>External</h2>
      </div>
    </>
  );
};

export default Rating;
