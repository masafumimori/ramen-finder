import React from "react";
import Style from "../style/title.module.scss";

function Title() {
  return (
    <h1 className={Style.title}>
      近くの美味しい
      <br />
      ラーメン屋を探そう！
    </h1>
  );
}

export default Title;
