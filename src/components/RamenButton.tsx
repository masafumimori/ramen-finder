import React, { useReducer } from "react";
import Style from "../style/ramen-button.module.scss";

function RamenButton(props: { setInput: (e: any) => void }) {
  const { setInput } = props;

  const handleClick = (e: any) => {
    e.preventDefault();

    console.log(e.target.value);
    setInput(e.target.value);
  };

  return (
    <button
      className={Style.searchButton}
      onClick={handleClick}
      value="ラーメン"
    >
      近場のラーメン、出てこいやっ！
    </button>
  );
}

export default RamenButton;
