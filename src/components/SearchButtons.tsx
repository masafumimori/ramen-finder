import React, { useReducer } from "react";

/**
 * this component can be used to let users choose what they feel like eating
 */

interface SearchButtonProps {
  foodNames?: Array<{ name: string }>;
  setInput: (e: any) => void;
}

function SearchButtons(props: SearchButtonProps) {
  const { foodNames, setInput } = props;
  const defaultFoodNames = [
    { name: "ラーメン" },
    { name: "うどん" },
    { name: "焼きそば" },
    { name: "そば" },
  ];

  const handleClick = (e: any) => {
    e.preventDefault();

    // e.target.disabled = true;
    console.log(e.target.value);
    setInput(e.target.value);
  };

  return (
    <div>
      {foodNames
        ? foodNames.map((food) => {
            return (
              <button
                key={food.name}
                value={food.name}
                onClick={(e) => handleClick(e)}
              >
                {food.name}
              </button>
            );
          })
        : defaultFoodNames.map((food) => {
            return (
              <button
                key={food.name}
                value={food.name}
                onClick={(e) => handleClick(e)}
              >
                {food.name}
              </button>
            );
          })}
    </div>
  );
}

export default SearchButtons;
