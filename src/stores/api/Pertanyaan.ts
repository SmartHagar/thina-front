/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
// api pertanyaan
type Props = {
  page?: number;
  limit?: number;
  search?: string;
};

type Store = {
  dtPertanyaan: any;
  setPertanyaan: ({ page, limit, search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setPertanyaanAll: ({ search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const usePertanyaanApi = create(
  devtools<Store>((set, get) => ({
    dtPertanyaan: [],
    setPertanyaan: async ({ page = 1, limit = 10, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/pertanyaan`,
          params: {
            limit,
            page,
            search,
          },
        });
        set((state) => ({ ...state, dtPertanyaan: response.data }));
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
    setPertanyaanAll: async ({ search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/pertanyaan/all`,
          params: {
            search,
          },
        });
        set((state) => ({ ...state, dtPertanyaan: response.data }));
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

export default usePertanyaanApi;
