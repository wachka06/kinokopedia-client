import React from "react";

const Form = ({ handleSubmit, mushroom, handleChange }) => {
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
    <div className="form-wrap">
      <form onSubmit={handleSubmit}>
        <button>&#10005;</button>
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
          fairy_rings:
          <input
            type="text"
            name="fairy_rings"
            placeholder={fairy_rings ? fairy_rings : ""}
            onChange={handleChange}
          />
        </label>
        <label>
          characteristics:
          <input
            type="text"
            name="characteristics"
            placeholder={characteristics ? characteristics : ""}
            onChange={handleChange}
          />
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

// {
//     latin_name: "Agaricus campestris",
//     common_name: ["Field mushroom", "Meadow mushroom"],
//     confused_with: ["Amanita bisporigera"],
//     region: ["Asia", "Europe", "Northern Africa", "Australia", "New Zealand", "North America"],
//     habitat: "Common in fields and grassy areas after rain from late summer onwards worldwide. It is often found on lawns in suburban areas",
//     fairy_rings: true,
//     characteristics: {
//         psychoactive: false,
//         poisonous: false,
//         deadly: false,
//         cap: ["convex", "flat"],
//         hymenium: ["free"],
//       sporePrint: ["brown"],
//       ecology: ["saprotrophic"],
//     },
//     img_url: "https://kingfishermushrooms.files.wordpress.com/2017/06/dsc_0303.jpg?w=676"
// },
