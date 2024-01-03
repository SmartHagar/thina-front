/** @format */
"use client";
import InputTextDefault from "@/components/input/InputTextDefault";
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
          addClass="col-span-4"
        />
      )}
      <InputTextDefault
        label="Nama"
        name="nama"
        register={register}
        required
        minLength={2}
        errors={errors.nama}
        addClass="col-span-4"
      />
      <InputTextDefault
        label="Jabatan"
        name="jabatan"
        register={register}
        required
        minLength={2}
        errors={errors.jabatan}
        addClass="col-span-4"
      />
    </>
  );
};

export default BodyForm;
