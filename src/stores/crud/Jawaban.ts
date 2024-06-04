/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "@/stores/auth/login";
// store jawaban
type Props = {
  page?: number;
  limit?: number;
  search?: string;
  tahun?: string | number;
  pegawai_id?: string | number;
};

type Store = {
  dtJawaban: any;
  setJawaban: ({ page, limit, search, tahun, pegawai_id }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setShowJawaban: (id: number | string) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  addData: (data: any) => Promise<{ status: string; data?: any; error?: any }>;
  removeData: (
    data: any
  ) => Promise<{ status: string; data?: any; error?: any }>;
  updateData: (
    id: number | string,
    data: any
  ) => Promise<{ status: string; data?: any; error?: any }>;
};

const useJawaban = create(
  devtools<Store>((set, get) => ({
    dtJawaban: [],
    setJawaban: async ({ tahun, pegawai_id }) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/jawaban`,
          headers: { Authorization: `Bearer ${token}` },
          params: {
            pegawai_id,
            tahun,
          },
        });
        set((state) => ({ ...state, dtJawaban: response.data.data }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response?.data,
        };
      }
    },
    setShowJawaban: async (id) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/jawaban/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        set((state) => ({ ...state, dtJawaban: response.data.data }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response?.data,
        };
      }
    },
    addData: async (row) => {
      try {
        const token = await useLogin.getState().setToken();
        const res = await crud({
          method: "post",
          url: `/jawaban`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: row,
        });
        // call setJawaban
        get().setJawaban({
          tahun: row.tahun,
          pegawai_id: row.pegawai_id,
        });
        return {
          status: "berhasil tambah",
          data: res.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          data: error.response.data,
        };
      }
    },
    removeData: async (id) => {
      try {
        const token = await useLogin.getState().setToken();
        const res = await crud({
          method: "delete",
          url: `/jawaban/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        set((prevState) => ({
          dtJawaban: {
            last_page: prevState.dtJawaban.last_page,
            current_page: prevState.dtJawaban.current_page,
            data: prevState.dtJawaban.data.filter(
              (item: any) => item.id !== id
            ),
          },
        }));
        return {
          status: "berhasil hapus",
          data: res.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          data: error.response.data,
        };
      }
    },
    updateData: async (id, row) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "PUT",
          url: `/jawaban/${id}`,
          headers: { Authorization: `Bearer ${token}` },
          data: row,
        });
        set((prevState) => ({
          dtJawaban: {
            last_page: prevState.dtJawaban.last_page,
            current_page: prevState.dtJawaban.current_page,
            data: prevState.dtJawaban.data.map((item: any) => {
              if (item.id === id) {
                return {
                  ...item,
                  ...response.data.data,
                };
              } else {
                return item;
              }
            }),
          },
        }));
        return {
          status: "berhasil update",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          data: error.response.data,
        };
      }
    },
  }))
);

export default useJawaban;
