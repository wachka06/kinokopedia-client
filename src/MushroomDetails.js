import React from "react";

const MushroomDetails = ({ mushroom, handleForm, handleDelete }) => {
  const {
    latin_name,
    common_name,
    confused_with,
    region,
    habitat,
    poisonous,
    img_url,
  } = mushroom;

  return (
    <div className="mushroom-details">
      <div className="img-wrap">
        <img src={img_url} alt={latin_name} />
      </div>
      <div>
        <button onClick={() => handleForm()}>EDIT</button>
        <button onClick={() => handleDelete(mushroom)}>DELETE</button>
        <p>latin_name: {latin_name}</p>
        <p>common_name: {common_name}</p>
        <p>confused_with: {confused_with}</p>
        <p>region: {region}</p>
        <p>habitat: {habitat}</p>
        <p>poisonous: {poisonous ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default MushroomDetails;
