import React from "react";
import { GrRefresh } from "react-icons/gr";
import Style from "../style/refresh-button.module.scss";

type ButtonProps = JSX.IntrinsicElements["button"];

function RefreshButton(props: ButtonProps) {
  return (
    <button className={Style.refreshButton} {...props}>
      <GrRefresh size={20} />
    </button>
  );
}

export default RefreshButton;
