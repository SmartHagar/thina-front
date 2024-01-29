/** @format */
"use client";
import InputTextDefault from "@/components/input/InputTextDefault";
import ModalDefault from "@/components/modal/ModalDefault";
import toastShow from "@/utils/toast-show";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BodyForm from "./BodyForm";
import usePertanyaan from "@/stores/crud/Pertanyaan";
import BtnDefault from "@/components/button/BtnDefault";

type Props = {
  showModal: boolean;
  setShowModal: (data: boolean) => void;
  dtEdit: any;
};

type Inputs = {
  id: number | string;
  tanya: string;
  indikator: string;
  bobot: number | string;
};

const Form = ({ showModal, setShowModal, dtEdit }: Props) => {
  // store
  const { addData, updateData } = usePertanyaan();
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
    setValue("tanya", "");
    setValue("indikator", "");
    setValue("bobot", "");
  };

  // data edit
  useEffect(() => {
    if (dtEdit) {
      setValue("id", dtEdit.id);
      setValue("tanya", dtEdit.tanya);
      setValue("indikator", dtEdit.indikator);
      setValue("bobot", dtEdit.bobot);
    } else {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal, dtEdit]);
  // simpan data
  const onSubmit: SubmitHandler<Inputs> = async (row) => {
    console.log({ row });
    // return;
    // jika dtEdit tidak kosong maka update
    if (dtEdit) {
      const { data } = await updateData(dtEdit.id, row);
      toastShow({
        event: data,
      });
      setShowModal(false);
    } else {
      const { data } = await addData(row);
      console.log({ data });
      toastShow({
        event: data,
      });
      data?.type !== "success" ? null : resetForm();
    }
  };

  return (
    <ModalDefault
      title="Form Pertanyaan"
      showModal={showModal}
      setShowModal={setShowModal}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputTextDefault name="id" register={register} type="hidden" />

        <div className="grid grid-cols-4 gap-2 mb-4">
          <BodyForm
            register={register}
            errors={errors}
            dtEdit={dtEdit}
            control={control}
            watch={watch}
            setValue={setValue}
            showModal={showModal}
          />
        </div>
        <div>
          <BtnDefault onClick={handleSubmit(onSubmit)}>Simpan</BtnDefault>
        </div>
      </form>
    </ModalDefault>
  );
};

export default Form;
