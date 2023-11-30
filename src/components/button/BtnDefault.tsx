/** @format */

import React, { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  addClass?: string;
  onClick?: () => void;
};

const BtnDefault: FC<Props> = ({
  children,
  onClick,
  addClass = "bg-btn-primary hover:bg-btn-primary/80",
}) => {
  return (
    <button
      type="button"
      className={`text-white ${addClass} font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BtnDefault;
