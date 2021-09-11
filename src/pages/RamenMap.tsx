import React, { useState } from "react";
import Map from "../components/Map";
import RamenButton from "../components/RamenButton";
import Title from "../components/Title";
import Style from "../style/ramen-map.module.scss";

function RamenMap() {
  const [input, setInput] = useState("");
  return (
    <div className={Style.remanMapWrapper}>
      <div className={Style.remanMapWrapper__content}>
        <Title />
        <div className={Style.mapContainer}>
          <Map input={input} />
        </div>
        <RamenButton setInput={setInput} />
      </div>
    </div>
  );
}

export default RamenMap;
