import React, { useState, useEffect } from "react";
import Header from "./header";
import Form from "./form";
import MushroomsContainer from "./MushroomsContainer";
import MushroomDetails from "./MushroomDetails";
import "./style.scss";

const App = () => {
  const endPoint = "http://localhost:3000/mushrooms/";
  const [data, setData] = useState([]);
  const [selectedMsh, setSelectedMsh] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    latin_name: "",
    common_name: "",
    confused_with: "",
    region: "",
    habitat: "",
    poisonous: false,
    img_url: "",
  });

  useEffect(() => {
    fetch(endPoint)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log("Request Failed", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      latin_name,
      common_name,
      confused_with,
      region,
      habitat,
      poisonous,
      img_url,
    } = form;

    const newMsh = {
      latin_name: latin_name,
      common_name: [common_name],
      confused_with: [confused_with],
      region: [region],
      habitat: habitat,
      poisonous: poisonous === "true" ? true : false,
      img_url: img_url,
    };

    if (!selectedMsh.id) {
      fetch(endPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        mode: "cors",
        cache: "no-cache",
        body: JSON.stringify(newMsh),
      })
        .then((res) => res.json())
        .then((newData) => setData([...data, newData]))
        .catch((error) => console.error("Request failed", error));
      setShowForm(!showForm);
    } else {
      const url = `${endPoint}${selectedMsh.id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        mode: "cors",
        cache: "no-cache",
        body: JSON.stringify(newMsh),
      })
        .then((res) => res.json())
        .then((newMsh) => {
          const newMushrooms = [...data].map((msh) => {
            return msh.id === newMsh.id ? (msh = newMsh) : msh;
          });
          setData(newMushrooms);
        })
        .catch((error) => console.error("Request failed", error));
      setShowForm(!showForm);
    }
  };

  const handleDelete = (selectedMsh) => {
    const url = `${endPoint}${selectedMsh.id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        const filteredMsh = [...data].filter((msh) => {
          return msh.id !== selectedMsh.id;
        });
        setData(filteredMsh);
      })
      .catch((error) => console.error("Request failed", error));
  };

  return (
    <div className="app">
      <Header handleForm={() => setShowForm(!showForm)} />
      <main>
        {showForm && (
          <Form
            handleSubmit={handleSubmit}
            handleForm={() => setShowForm(!showForm)}
            mushroom={selectedMsh}
            handleChange={handleChange}
          />
        )}
        {!selectedMsh.id ? (
          <MushroomsContainer
            mushrooms={data}
            handleClick={(msh) => setSelectedMsh(msh)}
          />
        ) : (
          selectedMsh.id && (
            <MushroomDetails
              mushroom={selectedMsh}
              handleForm={() => setShowForm(!showForm)}
              handleDelete={handleDelete}
            />
          )
        )}
      </main>
    </div>
  );
};

export default App;
