import React from "react";

export const text = {
  latin_name: "Latin name:",
  common_name: "Common name:",
  confused_with: "Confused with:",
  region: "Region:",
  habitat: "Habitat:",
  poisonous: "Poisonous:",
  img_url: "Image URL:",
};

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
        <p>
          {text.latin_name} {latin_name}
        </p>
        <p>
          {text.common_name} {common_name}
        </p>
        <p>
          {text.confused_with} {confused_with}
        </p>
        <p>
          {text.region} {region}
        </p>
        <p>
          {text.habitat} {habitat}
        </p>
        <p>
          {text.poisonous} {poisonous ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
};

export default MushroomDetails;
