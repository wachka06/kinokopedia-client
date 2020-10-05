import React from "react";

const MushroomCard = ({ mushroom, handleClick }) => {
  const { latin_name, common_name, img_url } = mushroom;
  return (
    <div className="mushroom-card">
      <div className="img-wrap">
        <img src={img_url} alt={latin_name} />
      </div>
      <div className="text-wrap">
        <h5>{latin_name}</h5>
        <p>{common_name && `${`aka ${common_name.join(", ")}`}`}</p>
        <button onClick={() => handleClick(mushroom)}>more</button>
      </div>
    </div>
  );
};

export default MushroomCard;
