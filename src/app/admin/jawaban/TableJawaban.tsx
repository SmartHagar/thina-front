/** @format */

import React, { FC, useEffect, useState } from "react";

type Props = {
  dataTable: any;
  page: number;
  limit: number;
  dtPertanyaan: any;
};

const TableJawaban: FC<Props> = ({ dataTable, page, limit, dtPertanyaan }) => {
  // state
  const [indikator, setIndikator] = useState<any>();
  // no urut
  const showNo = (index: number) => {
    let noUrut = (page - 1) * limit + index;
    return noUrut + 1;
  };
  const customOrder = ["Kekuatan", "Kelemahan", "Peluang", "Ancaman"];

  //  olah dtPertanyaan
  const olahPertanyaan = () => {
    // group by indikator
    const dtPertanyaanGroup = dtPertanyaan.reduce((acc: any, cur: any) => {
      if (!acc[cur.indikator]) {
        acc[cur.indikator] = [];
      }
      acc[cur.indikator].push(cur);
      return acc;
    }, {});
    //    get key and value
    const dtPertanyaanGroupArr = Object.keys(dtPertanyaanGroup).map(
      (key: any) => {
        return {
          indikator: key,
          length: dtPertanyaanGroup[key].length,
        };
      }
    );
    // costume order dtPertanyaanGroupArr
    dtPertanyaanGroupArr.sort((a: any, b: any) => {
      return (
        customOrder.indexOf(a.indikator) - customOrder.indexOf(b.indikator)
      );
    });

    setIndikator(dtPertanyaanGroupArr);
  };

  useEffect(() => {
    olahPertanyaan();

    return () => {};
  }, [dtPertanyaan]);

  return (
    <table className="w-full border-collapse border text-left">
      <thead className="">
        <tr className="bg-gray-100">
          <th scope="col" className={`px-6 py-4 border`}>
            No
          </th>
          <th scope="col" className={`px-6 py-4 border`}>
            Nama
          </th>
          <th scope="col" className={`px-6 py-4 border`}>
            Bidang
          </th>
          <th scope="col" className={`px-6 py-4 border`}>
            Jabatan
          </th>
          {indikator &&
            indikator.map((item: any, index: number) => {
              return (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-4 border text-center`}
                  colSpan={item.length}
                >{`${item.indikator}`}</th>
              );
            })}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 border-t border-gray-100 ">
        {/* loop tr */}
        {dataTable &&
          dataTable.map((row: any, index: number) => {
            const { id, nama, jabatan, bidang, jawaban } = row;
            // sort costume jawaban by pertanyaan.indikator ='Kekuatan', 'Kelemahan', 'PELUANG','ANCAMAN'
            const sortedJawaban = jawaban
              .slice()
              .sort(
                (a: any, b: any) =>
                  customOrder.indexOf(a.pertanyaan.indikator) -
                  customOrder.indexOf(b.pertanyaan.indikator)
              );
            return (
              <tr key={index}>
                <td className="px-6 py-4 rounded-l-xl border">
                  {showNo(index)}
                </td>
                {/* loop td */}
                <td className={`px-6 py-4 whitespace-nowrap border`}>{nama}</td>
                <td className={`px-6 py-4 whitespace-nowrap border`}>
                  {bidang.nama}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap border`}>
                  {jabatan}
                </td>
                {/* jawaban */}
                {sortedJawaban.map((jawaban: any, index: number) => {
                  return (
                    <td
                      key={index}
                      className={`px-6 py-4 whitespace-nowrap border`}
                    >
                      {jawaban.rating}
                    </td>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default TableJawaban;
