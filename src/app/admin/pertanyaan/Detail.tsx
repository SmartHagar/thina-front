/** @format */

import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { BsXLg } from "react-icons/bs";

type Props = {
  children: ReactNode;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  width?: string;
  title: string;
};

const Detail: FC<Props> = ({
  showModal,
  setShowModal,
  width = "800px",
  title,
  children,
}) => {
  return (
    <div className="">
      {showModal && (
        <div className="fixed inset-0 z-50 mx-auto flex justify-center bg-black/[0.2]">
          <div
            className="bg-white p-5 rounded-xl w-[500px] h-min mt-[10%] max-h-[70%] overflow-hidden flex flex-col lg:w-[700px]"
            style={{ width: width }}
          >
            {/* header */}
            <div className="flex flex-row items-center justify-between border-b border-primary/[0.2] mb-4 pb-2">
              <h5 className="text-xl font-roboto">{title}</h5>
              <BsXLg
                className="cursor-pointer hover:text-primary"
                onClick={() => setShowModal(false)}
              />
            </div>
            {/* body */}
            <div className="overflow-auto">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
