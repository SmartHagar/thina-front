/** @format */
"use client";
import React, { useEffect, useState } from "react";

import { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import SelectTahun from "@/components/select/SelectTahun";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import useJawabanApi from "@/stores/api/Jawaban";
import ShowData from "./ShowData";

const Jawaban = () => {
  // router
  const router = useRouter();
  const params = useSearchParams();

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
      router.push("/admin/jawaban?tahun=" + tahun);
    } else {
      setValue("tahun", parseInt(tahunParams || ""));
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tahunWatch) {
      router.push("/admin/jawaban?tahun=" + tahunWatch);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tahunWatch]);

  return (
    <div className="flex flex-col h-full">
      {/* pilih tahun */}
      <div>
        <SelectTahun
          label="Pilih Tahun"
          name="tahun"
          placeholder="Pilih Tahun"
          start={new Date().getFullYear() - 2}
          end={new Date().getFullYear()}
          fromMax
          control={control}
          errors={errors}
          addClass="w-full"
        />
      </div>
      <div>
        <Toaster />
      </div>

      <div>
        <ShowData tahunWatch={tahunWatch} />
      </div>
    </div>
  );
};

export default Jawaban;
