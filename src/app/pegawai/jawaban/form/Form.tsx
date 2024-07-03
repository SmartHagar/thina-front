/** @format */
"use client";
import InputTextDefault from "@/components/input/InputTextDefault";
import toastShow from "@/utils/toast-show";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BodyForm from "./BodyForm";
import useJawaban from "@/stores/crud/Jawaban";
import BtnDefault from "@/components/button/BtnDefault";
import Cookies from "js-cookie";
import ModalDefault from "@/components/modal/ModalDefault";
import usePertanyaanApi from "@/stores/api/Pertanyaan";

type Jawaban = {
  pertanyaan_id: string | number;
  rating: number;
};

type Inputs = {
  id: number | string;
  pegawai_id: string | number;
  jawaban: Jawaban[];
  tahun: string | number;
};

type Props = {
  tahun: string | number;
};

const Form = ({ tahun }: Props) => {
  // cookie
  const pegawai = JSON.parse(Cookies.get("pegawai") || "{}");
  // store
  const { addData } = useJawaban();
  const { setPertanyaanAll, dtPertanyaan } = usePertanyaanApi();
  // state
  const [showModal, setShowModal] = useState(false);
  const [dtAdd, setDtAdd] = useState<Inputs | null>(null);
  // hook form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  // reset form
  const resetForm = () => {
    setValue("id", "");
    setValue("pegawai_id", parseInt(pegawai.id));
    setValue("tahun", tahun);
  };

  // reset form
  useEffect(() => {
    tahun && resetForm();
    setPertanyaanAll({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tahun, JSON.stringify(pegawai.id)]);

  // simpan data
  const onSubmit: SubmitHandler<Inputs> = async (row) => {
    setShowModal(true);
    setDtAdd(row);
  };

  const onSubmitInput = async (dtInput: Inputs | null) => {
    console.log({ dtInput });
    // jika dtEdit tidak kosong maka update
    const { data } = await addData(dtInput);
    console.log({ data });
    toastShow({
      event: data,
    });
    data?.type !== "success" ? null : resetForm();
  };

  // set modal
  const setModal = (data: boolean) => {
    if (data) {
      onSubmitInput(dtAdd);
    }
    setShowModal(false);
  };

  return (
    <>
      {/* modal */}
      <ModalDefault
        showModal={showModal}
        setShowModal={setShowModal}
        title="Tambah"
      >
        Yakin ?
        <div className="flex justify-end gap-2">
          <BtnDefault
            onClick={() => {
              setModal(false);
            }}
          >
            Tidak
          </BtnDefault>
          <BtnDefault
            onClick={() => {
              setModal(true);
            }}
          >
            Iya
          </BtnDefault>
        </div>
      </ModalDefault>
      {/* head */}
      <div className="my-4 border-b text-lg">
        <p className="">
          Silahkan menjawab pernyataan dibawah ini dengan memilih salah satu
          jawaban dengan rating 1 sampai 4 dengan keterangan sebagai berikut.
        </p>
        <div className="flex flex-col mb-4">
          <span className="">1 = Rendah</span>
          <span className="">2 = Cukup Tinggi</span>
          <span className="">3 = Tinggi</span>
          <span className="">4 = Sangat Tinggi</span>
        </div>
      </div>
      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputTextDefault name="id" register={register} type="hidden" />

        <div className="grid grid-cols-4 gap-2 mb-4">
          <BodyForm
            register={register}
            errors={errors}
            control={control}
            watch={watch}
            setValue={setValue}
            dtPertanyaan={dtPertanyaan.data}
          />
        </div>
        <div>
          <BtnDefault onClick={handleSubmit(onSubmit)}>Simpan</BtnDefault>
        </div>
      </form>
    </>
  );
};

export default Form;
