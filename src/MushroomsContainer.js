import React from "react";
import MushroomCard from "./MushroomCard";

const MushroomsContainer = ({ mushrooms, handleClick }) => {
  return (
    <div className="mushrooms-container">
      {mushrooms.map((mushroom) => (
        <MushroomCard
          key={mushroom.id}
          mushroom={mushroom}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default MushroomsContainer;
