/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import usePegawai from "@/stores/crud/Pegawai";
import React, { FC, useEffect, useState } from "react";
import TableJawaban from "./TableJawaban";
import useJawabanApi from "@/stores/api/Jawaban";
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
  const [limit, setLimit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    setPertanyaanAll({});
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tahunWatch]);
  return (
    <div className="flex-1 flex-col max-w-full h-full overflow-auto">
      {isLoading ? (
        <LoadingSpiner />
      ) : (
        <>
          <div className="mt-4">
            <TableJawaban
              dataTable={dtJawaban.data}
              page={page}
              limit={limit}
              dtPertanyaan={dtPertanyaan?.data}
            />
          </div>
          {dtJawaban?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtJawaban?.current_page}
                totalPages={dtJawaban?.last_page}
                setPage={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShowData;
