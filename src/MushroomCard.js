import React from "react";

const MushroomCard = ({ mushroom, handleClick }) => {
  const { latin_name, img_url } = mushroom;
  return (
    <div className="mushroom-card">
      <div className="img-wrap">
        <img src={img_url} alt={""} />
      </div>
      <p>{latin_name}</p>
      <button onClick={() => handleClick(mushroom)}>Details</button>
    </div>
  );
};

export default MushroomCard;
