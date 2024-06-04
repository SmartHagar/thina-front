/** @format */
"use client";
import InputTextDefault from "@/components/input/InputTextDefault";
import { SelectDefault } from "@/components/select/SelectDefault";
import React, { FC } from "react";

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
  return (
    <>
      <InputTextDefault
        label="Pernyataan"
        name="tanya"
        register={register}
        required
        minLength={2}
        errors={errors.tanya}
        addClass="col-span-4"
      />
      <SelectDefault
        label="Indikator"
        defaultOption="Pilih Indikator"
        register={register}
        errors={errors.indikator}
        name="indikator"
        required
        options={[
          { value: "Kekuatan", label: "Kekuatan" },
          { value: "Kelemahan", label: "Kelemahan" },
          { value: "Peluang", label: "Peluang" },
          { value: "Ancaman", label: "Ancaman" },
        ]}
        addClass="col-span-4 lg:col-span-2"
      />
      <InputTextDefault
        label="Tingkat"
        name="tingkat"
        register={register}
        required
        type="number"
        errors={errors.tingkat}
        addClass="col-span-2"
      />
    </>
  );
};

export default BodyForm;
