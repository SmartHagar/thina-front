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
  const startAscii = "A".charCodeAt(0);
  const totalPilih = Array.from({ length: 4 }, (_, i) =>
    String.fromCharCode(startAscii + i)
  );
  return (
    <>
      <InputTextDefault
        label="Pertanyaan"
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
      {/* pilihann jawaban */}
      {totalPilih.map((alphabet, i) => {
        // i too alphabet
        return (
          <div key={i} className="col-span-4 grid grid-cols-4 gap-4">
            <InputTextDefault
              label={`Pilih ${alphabet}`}
              name={`pilihan[${i}].pilih`}
              register={register}
              required
              minLength={2}
              errors={errors?.pilihan && errors.pilihan[i]?.pilih}
              addClass="col-span-4 lg:col-span-3"
            />
            <InputTextDefault
              label={`Rating ${alphabet}`}
              name={`pilihan[${i}].rating`}
              register={register}
              required
              type="number"
              errors={errors?.pilihan && errors.pilihan[i]?.rating}
              addClass="col-span-4 lg:col-span-1"
            />
          </div>
        );
      })}
    </>
  );
};

export default BodyForm;
