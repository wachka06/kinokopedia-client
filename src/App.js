import React, { Component } from "react";
import Header from "./header";
import Form from "./form";
import MushroomsContainer from "./MushroomsContainer";
import MushroomDetails from "./MushroomDetails";
import "./style.scss";

const endPoint = "http://localhost:3000/mushrooms/";

class App extends Component {
  state = {
    mushrooms: [],
    selectedMsh: {},
    showForm: false,
    showEdit: false,
    form: {
      latin_name: "",
      common_name: "",
      confused_with: "",
      region: "",
      habitat: "",
      fairy_rings: "",
      characteristics: "",
      img_url: "",
    },
  };

  componentDidMount = () => {
    fetch(endPoint, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((mushrooms) => this.setState({ mushrooms }));
  };

  handleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      latin_name,
      common_name,
      confused_with,
      region,
      habitat,
      fairy_rings,
      characteristics,
      img_url,
    } = this.state.form;

    const newMsh = {
      latin_name: latin_name,
      common_name: [common_name],
      confused_with: [confused_with],
      region: [region],
      habitat: habitat,
      fairy_rings: fairy_rings,
      characteristics: characteristics,
      img_url: img_url,
    };

    if (!this.state.selectedMsh) {
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
        .then((newData) => console.log(newData, "newDate"))
        .catch((error) => console.error("Request failed", error));
      this.setState({ showForm: !this.state.showForm });
    } else {
      const url = `${endPoint}${this.state.selectedMsh.id}`;
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
          const newMushrooms = this.state.mushrooms.map((msh) => {
            return msh.id === newMsh.id ? (msh = newMsh) : msh;
          });
          this.setState({ mushrooms: newMushrooms });
        })
        .catch((error) => console.error("Request failed", error));
      this.setState({ showEdit: !this.state.showEdit });
    }
  };

  handleClick = (msh) => {
    this.setState({ selectedMsh: msh });
  };

  handleEdit = () => {
    this.setState({ showEdit: !this.state.showEdit });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ form: { [name]: value } });
  };

  handleDelete = (selectedMsh) => {
    const url = `${endPoint}${selectedMsh.id}`;
    fetch(url, {
      method: "DELETE",
      // headers: {
      //   "Content-Type": "application/json",
      //   Accept: "application/json",
      //   "Access-Control-Allow-Origin": "*",
      // },
    })
      .then((res) => res.json())
      .then((newData) => console.log(newData, "new"))
      .catch((error) => console.error("Request failed", error));
  };

  render() {
    console.log(this.state.mushrooms, "MUSH");
    return (
      <div className="app">
        <Header handleForm={this.handleForm} />
        <main>
          {this.state.showForm && <Form handleSubmit={this.handleSubmit} />}
          {this.state.showEdit && (
            <Form
              handleSubmit={this.handleSubmit}
              mushroom={this.state.selectedMsh}
              handleChange={this.handleChange}
            />
          )}
          {!this.state.selectedMsh.id ? (
            <MushroomsContainer
              mushrooms={this.state.mushrooms}
              handleClick={this.handleClick}
            />
          ) : (
            this.state.selectedMsh.id && (
              <MushroomDetails
                mushroom={this.state.selectedMsh}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
              />
            )
          )}
        </main>
      </div>
    );
  }
}

export default App;
