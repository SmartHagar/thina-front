/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
// api jawaban
type Props = {
  page?: number;
  limit?: number;
  tahun?: string | number;
  search?: string;
};

type Store = {
  dtJawaban: any;
  setJawaban: ({ page, limit, tahun }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;

  setJawabanAll: () => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;

  setJawabanByPegwai: ({ page, limit, tahun, search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const useJawabanApi = create(
  devtools<Store>((set, get) => ({
    dtJawaban: [],
    setJawaban: async ({ page = 1, limit = 10, tahun }) => {
      try {
        const response = await api({
          method: "get",
          url: `/jawaban`,
          params: {
            limit,
            page,
            tahun,
          },
        });
        set((state) => ({ ...state, dtJawaban: response.data?.data }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
    setJawabanAll: async () => {
      try {
        const response = await api({
          method: "get",
          url: `/jawaban/all`,
        });
        set((state) => ({ ...state, dtJawaban: response.data }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
    setJawabanByPegwai: async ({ page = 1, limit = 10, tahun, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/jawaban/byPegawai`,
          params: {
            limit,
            page,
            tahun,
            search,
          },
        });
        set((state) => ({ ...state, dtJawaban: response.data?.data }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
  }))
);

export default useJawabanApi;
