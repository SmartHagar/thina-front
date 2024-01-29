/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import usePertanyaan from "@/stores/crud/Pertanyaan";
import React, { FC, useEffect, useState } from "react";
import { BsBrush, BsChatRightFill } from "react-icons/bs";

type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};

type Props = {
  setDelete: ({ id, isDelete }: DeleteProps) => void;
  setEdit: (row: any) => void;
  search: string;
};

const ShowData: FC<Props> = ({ setDelete, setEdit, search }) => {
  const { setPertanyaan, dtPertanyaan } = usePertanyaan();
  // state
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchDataPertanyaan = async () => {
    const res = await setPertanyaan({
      page,
      limit,
      search,
    });
    setIsLoading(false);
  };
  useEffect(() => {
    fetchDataPertanyaan();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);
  // ketika search berubah
  useEffect(() => {
    setPage(1);
    fetchDataPertanyaan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // table
  const headTable = ["No", "Pertanyaan", "Indikator", "Tingkat", "Aksi"];
  const tableBodies = ["tanya", "indikator", "tingkat"];
  // costume action
  return (
    <div className="flex-1 flex-col max-w-full h-full overflow-auto">
      {isLoading ? (
        <LoadingSpiner />
      ) : (
        <>
          <div className="">
            <TablesDefault
              headTable={headTable}
              tableBodies={tableBodies}
              dataTable={dtPertanyaan.data}
              page={page}
              limit={limit}
              setEdit={setEdit}
              setDelete={setDelete}
              ubah={true}
              hapus={true}
            />
          </div>
          {dtPertanyaan?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtPertanyaan?.current_page}
                totalPages={dtPertanyaan?.last_page}
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
