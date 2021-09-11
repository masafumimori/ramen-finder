import React, { useState } from "react";
import Map from "../components/Map";
import RamenButton from "../components/RamenButton";
import RamenResults from "../components/RamenResults";
import Title from "../components/Title";
import Style from "../style/ramen-map.module.scss";

export type ResultType = google.maps.places.PlaceResult[];

function RamenMap() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<ResultType>();
  return (
    <div className={Style.remanMapWrapper}>
      <div className={Style.remanMapWrapper__content}>
        <Title />
        <div className={Style.mapContainer}>
          <Map input={input} setResults={setResults} />
        </div>
        <RamenButton setInput={setInput} />
        {results && results?.length > 0 ? (
          <RamenResults results={results} />
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default RamenMap;
