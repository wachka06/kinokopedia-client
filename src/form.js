import React from "react";

const Form = ({ handleSubmit, mushroom, handleChange, handleForm }) => {
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
    <div className="form-wrap">
      <form onSubmit={handleSubmit}>
        <button onClick={() => handleForm()}>&#10005;</button>
        <label>
          latin_name:
          <input
            type="text"
            name="latin_name"
            placeholder={latin_name ? latin_name : ""}
            onChange={handleChange}
          />
        </label>
        <label>
          common_name:
          <input
            type="text"
            name="common_name"
            placeholder={common_name ? common_name : ""}
            onChange={handleChange}
          />
        </label>
        <label>
          confused_with:
          <input
            type="text"
            name="confused_with"
            placeholder={confused_with ? confused_with : ""}
            onChange={handleChange}
          />
        </label>
        <label>
          region:
          <input
            type="text"
            name="region"
            placeholder={region ? region : ""}
            onChange={handleChange}
          />
        </label>
        <label>
          habitat:
          <input
            type="text"
            name="habitat"
            placeholder={habitat ? habitat : ""}
            onChange={handleChange}
          />
        </label>
        <label>
          poisonous:
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
          img_url:
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
