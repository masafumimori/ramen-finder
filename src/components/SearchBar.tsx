import React, { ChangeEvent, memo, SyntheticEvent, useState } from "react";

interface Props {}

function SearchBar(props: {
  input: string;
  setInput: any;
  findRamenPlace: (e: any) => void;
}) {
  const { input, setInput, findRamenPlace } = props;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    console.log("submit");
    console.log(input);
    findRamenPlace(e);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default memo(SearchBar);
