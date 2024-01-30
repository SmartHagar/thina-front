/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import usePegawai from "@/stores/crud/Pegawai";
import React, { FC, useEffect, useState } from "react";
import useJawabanApi from "@/stores/api/Jawaban";
import { olahJawaban } from "./olahData";
import Rating from "./swot/Rating";

type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};

type Props = {
  tahunWatch: string;
};

const ShowData: FC<Props> = ({ tahunWatch }) => {
  // store
  const { setJawabanByPegwai, dtJawaban } = useJawabanApi();
  // state
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(100);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dtOlahJawaban, setDtOlahJawaban] = useState<any>();

  // panggil setJawabanByPegwai
  const fetchJawaban = async () => {
    setIsLoading(true);
    await setJawabanByPegwai({
      tahun: parseInt(tahunWatch || ""),
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    tahunWatch && fetchJawaban();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tahunWatch]);

  // ketika jawaban berubah
  useEffect(() => {
    const dtOlah = olahJawaban(dtJawaban);
    setDtOlahJawaban(dtOlah);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dtJawaban]);
  return (
    <div className="flex flex-col max-w-full h-full overflow-auto border grow">
      {isLoading ? (
        <LoadingSpiner />
      ) : (
        <div className="mt-4">{/* <Rating dataTable={dtOlahJawaban} /> */}</div>
      )}
    </div>
  );
};

export default ShowData;
