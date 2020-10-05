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

const Form = ({ handleSubmit, mushroom, handleChange, handleForm }) => {
  const {
    latin_name,
    common_name,
    confused_with,
    region,
    habitat,
    img_url,
  } = mushroom;
  return (
    <div className="form-wrap">
      <form onSubmit={handleSubmit}>
        <button onClick={() => handleForm()}>&#10005;</button>
        <label>
          {text.latin_name}
          <input
            type="text"
            name="latin_name"
            placeholder={latin_name ? latin_name : ""}
            onChange={handleChange}
          />
        </label>
        <label>
          {text.common_name}
          <input
            type="text"
            name="common_name"
            placeholder={common_name ? common_name : ""}
            onChange={handleChange}
          />
        </label>
        <label>
          {text.confused_with}
          <input
            type="text"
            name="confused_with"
            placeholder={confused_with ? confused_with : ""}
            onChange={handleChange}
          />
        </label>
        <label>
          {text.region}
          <input
            type="text"
            name="region"
            placeholder={region ? region : ""}
            onChange={handleChange}
          />
        </label>
        <label>
          {text.habitat}
          <input
            type="text"
            name="habitat"
            placeholder={habitat ? habitat : ""}
            onChange={handleChange}
          />
        </label>
        <label>
          {text.poisonous}
          <input
            type="radio"
            name="poisonous"
            value={true}
            onChange={handleChange}
          />
          Yes
          <input
            type="radio"
            name="poisonous"
            value={false}
            onChange={handleChange}
          />
          No
        </label>
        <label>
          {text.img_url}
          <input
            type="text"
            name="img_url"
            placeholder={img_url ? img_url : ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Form;
