/** @format */
"use client";
import InputTextDefault from "@/components/input/InputTextDefault";
import RadioInput from "@/components/radio/RadioInput";
import usePertanyaanApi from "@/stores/api/Pertanyaan";
import React, { FC, useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

type Props = {
  register: any;
  errors: any;
  control: any;
  watch: any;
  setValue: any;
  dtPertanyaan: any;
};

const BodyForm: FC<Props> = ({
  register,
  errors,
  control,
  watch,
  setValue,
  dtPertanyaan,
}) => {
  const pilihan = Array.from({ length: 4 }, (_, i) => i);
  const [sortPertanyaan, setSortPertanyaan] = useState<any>([]);
  const customOrder = ["Kekuatan", "Kelemahan", "Peluang", "Ancaman"];

  //  olah dtPertanyaan
  const olahPertanyaan = () => {
    const sortedPertanyaan =
      dtPertanyaan &&
      dtPertanyaan
        .slice()
        .sort(
          (a: any, b: any) =>
            customOrder.indexOf(a.indikator) - customOrder.indexOf(b.indikator)
        );

    setSortPertanyaan(sortedPertanyaan);
  };

  useEffect(() => {
    olahPertanyaan();

    return () => {};
  }, [dtPertanyaan]);
  return (
    <>
      {sortPertanyaan &&
        sortPertanyaan?.map((item: any, index: number) => {
          const no = index + 1;
          return (
            <div key={index} className="col-span-4">
              <div className="flex">
                <span className="mr-3">{no}.</span>
                <span>{item.tanya}</span>
              </div>
              <div className="ml-8">
                {/* pertanyaan id */}
                <InputTextDefault
                  register={register}
                  errors={errors}
                  name={`jawaban[${index}].pertanyaan_id`}
                  type="hidden"
                  value={item.id}
                />
                <div className="flex gap-x-6">
                  {pilihan.map((i) => (
                    <RadioInput
                      key={i}
                      register={register}
                      name={`jawaban[${index}].rating`}
                      required
                      value={i + 1}
                      id={`jawaban[${index}].${i}`}
                      errors={errors.jawaban}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default BodyForm;
