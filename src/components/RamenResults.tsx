import React, { useEffect } from "react";
import { ResultType } from "../pages/RamenMap";

function RamenResults(props: { results: ResultType }) {
  const { results } = props;

  const ramenCount = results.length;
  let topRamen = "";
  let rating = 0;
  results.map((ramen) => {

    if (!ramen.rating) return;
    if (rating < ramen.rating) {
      rating = ramen.rating;
      topRamen = ramen.name!;
    }
  });

  return (
    <>
      <p style={{ zIndex: 1000, color: "#fff" }}>
        半径1km以内に
        <br />
        {ramenCount}件のラーメン屋が見つかりました！
        <br />
        <span style={{ fontSize: "0.8rem" }}>
          最高評価は『{topRamen}』の⭐️{rating}です
        </span>
      </p>
    </>
  );
}

export default RamenResults;
