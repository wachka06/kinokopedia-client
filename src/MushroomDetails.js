import React from "react";
import MushroomCard from "./MushroomCard";

const MushroomDetails = ({ mushroom, handleEdit, handleDelete }) => {
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
  return (
    <div className="mushroom-details">
      <div className="img-wrap">
        <img src={img_url} />
      </div>
      <div>
        <button onClick={() => handleEdit()}>EDIT</button>
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
