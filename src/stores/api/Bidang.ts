/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
// api bidang
type Props = {
  page?: number;
  limit?: number;
  search?: string;
};

type Store = {
  dtBidang: any;
  setBidang: ({ page, limit, search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setBidangAll: ({ search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const useBidangApi = create(
  devtools<Store>((set, get) => ({
    dtBidang: [],
    setBidang: async ({ page = 1, limit = 10, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/bidang`,
          params: {
            limit,
            page,
            search,
          },
        });
        set((state) => ({ ...state, dtBidang: response.data }));
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
    setBidangAll: async ({ search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/bidang/all`,
          params: {
            search,
          },
        });
        set((state) => ({ ...state, dtBidang: response.data }));
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

export default useBidangApi;
