import React from "react";

const Header = ({ handleForm }) => {
  return (
    <header>
      <h3>Kinokopedia</h3>
      <button onClick={() => handleForm()}>Create a new mushroom</button>
    </header>
  );
};

export default Header;
