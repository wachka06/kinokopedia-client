import React from "react";

const MushroomDetails = ({ mushroom, handleForm, handleDelete }) => {
  const {
    latin_name,
    common_name,
    confused_with,
    region,
    habitat,
    fairy_rings,
    characteristics,
    img_url,
  } = mushroom;
  console.log(Array.isArray(confused_with), "TYPE");
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
        <p>fairy_rings: {fairy_rings}</p>
        <p>characteristics: {characteristics}</p>
      </div>
    </div>
  );
};

export default MushroomDetails;
