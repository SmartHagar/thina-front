/** @format */
"use client";
import { useEffect, useState } from "react";

import ShowData from "./ShowData";
import Form from "./form/Form";
import useJawaban from "@/stores/crud/Jawaban";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import SelectTahun from "@/components/select/SelectTahun";
import LoadingSpiner from "@/components/loading/LoadingSpiner";

const Jawaban = () => {
  // router
  const router = useRouter();
  const params = useSearchParams();
  // store
  const { setJawaban, dtJawaban } = useJawaban();
  // state
  const pegawai = JSON.parse(Cookies.get("pegawai") || "{}");
  const [isLoading, setIsLoading] = useState(true);
  // panggil setJawaban
  const fetchJawaban = async () => {
    setIsLoading(true);
    await setJawaban({
      tahun: parseInt(tahunWatch || ""),
      pegawai_id: parseInt(pegawai.id),
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // hook form
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const tahunWatch = watch("tahun");
  // set tahun dan
  const tahunParams = params.get("tahun");
  useEffect(() => {
    if (!tahunParams) {
      const tahun = new Date().getFullYear();
      setValue("tahun", tahun);
      // add parameter to url
      router.push("/pegawai/jawaban?tahun=" + tahun);
    } else {
      setValue("tahun", parseInt(tahunParams || ""));
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tahunWatch) {
      router.push("/pegawai/jawaban?tahun=" + tahunWatch);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tahunWatch]);

  useEffect(() => {
    tahunWatch && fetchJawaban();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tahunWatch, JSON.stringify(pegawai.id)]);

  return (
    <div className="flex flex-col h-full">
      {/* pilih tahun */}
      <div>
        <SelectTahun
          label="Tahun"
          name="tahun"
          placeholder="Pilih Tahun"
          start={new Date().getFullYear() - 2}
          end={new Date().getFullYear()}
          fromMax
          control={control}
          required
          errors={errors}
          addClass="w-full"
        />
      </div>
      <div>
        <Toaster />
      </div>

      {isLoading ? (
        <div className="absolute inset-0 left-24 flex justify-center items-center">
          <LoadingSpiner />
        </div>
      ) : dtJawaban?.length > 0 ? (
        <ShowData dtJawaban={dtJawaban} />
      ) : (
        <Form tahun={parseInt(tahunWatch)} />
      )}
    </div>
  );
};

export default Jawaban;
