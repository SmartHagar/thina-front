/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import usePegawai from "@/stores/crud/Pegawai";
import React, { FC, useEffect, useState } from "react";
import useJawabanApi from "@/stores/api/Jawaban";
import { olahJawaban, olahPertanyaan } from "./olahData";
import Rating from "./swot/Rating";
import usePertanyaanApi from "@/stores/api/Pertanyaan";

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
  const { setPertanyaanAll, dtPertanyaan } = usePertanyaanApi();
  // state
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(100);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dtOlahJawaban, setDtOlahJawaban] = useState<any>();
  const [dtOlahPertanyaan, setDtOlahPertanyaan] = useState<any>();

  // panggil setJawabanByPegwai
  const fetchJawaban = async () => {
    setIsLoading(true);
    await setJawabanByPegwai({
      tahun: parseInt(tahunWatch || ""),
    });
    await setPertanyaanAll({});
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
    setDtOlahPertanyaan(olahPertanyaan(dtPertanyaan?.data));
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dtJawaban, dtPertanyaan?.data]);

  return (
    <div className="flex flex-col max-w-full h-full overflow-auto grow">
      {isLoading ? (
        <LoadingSpiner />
      ) : (
        <div className="mt-4">
          <Rating dataTable={dtOlahJawaban} dtPertanyaan={dtOlahPertanyaan} />
        </div>
      )}
    </div>
  );
};

export default ShowData;
