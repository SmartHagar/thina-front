/** @format */
"use client";
import InputTextDefault from "@/components/input/InputTextDefault";
import { SelectDefault } from "@/components/select/SelectDefault";
import SelectFromDb from "@/components/select/SelectFromDB";
import useBidangApi from "@/stores/api/Bidang";
import React, { FC, useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css";

type Props = {
  register: any;
  errors: any;
  dtEdit: any;
  control: any;
  watch: any;
  setValue: any;
  showModal: boolean;
};

const BodyForm: FC<Props> = ({
  register,
  errors,
  control,
  dtEdit,
  watch,
  setValue,
  showModal,
}) => {
  const { setBidangAll, dtBidang } = useBidangApi();
  // memanggil data bidang
  const fetchDataBidang = async ({ search }: any) => {
    await setBidangAll({
      search,
    });
  };
  useEffect(() => {
    fetchDataBidang({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);
  return (
    <>
      <InputTextDefault
        label="Nama"
        name="nama"
        register={register}
        required
        minLength={2}
        errors={errors.nama}
        addClass="col-span-4"
      />
      {dtBidang?.data && (
        <SelectFromDb
          label="Bidang"
          placeholder="Pilih Bidang"
          name="bidang_id"
          dataDb={dtBidang?.data}
          body={["id", "nama"]}
          control={control}
          required
          errors={errors.bidang_id}
          addClass="col-span-4 lg:col-span-2"
        />
      )}
      <SelectDefault
        label="Jabatan"
        defaultOption="Pilih Jabatan"
        register={register}
        errors={errors}
        name="jabatan"
        options={[
          { value: "Staf", label: "Staf" },
          { value: "Satkam", label: "Satkam" },
          { value: "Pekarya", label: "Pekarya" },
        ]}
        addClass="col-span-4 lg:col-span-2"
      />
    </>
  );
};

export default BodyForm;
