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
    latin_name: "",
    common_name: "",
    confused_with: "",
    region: "",
    habitat: "",
    poisonous: false,
    img_url: "",
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
      poisonous,
      img_url,
    } = this.state;

    const newMsh = {
      latin_name: latin_name,
      common_name: [common_name],
      confused_with: [confused_with],
      region: [region],
      habitat: habitat,
      poisonous: poisonous === "true" ? true : false,
      img_url: img_url,
    };
    console.log(newMsh, "newMsh");
    if (!this.state.selectedMsh.id) {
      console.log(this.state, "form");
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
        .then((newData) => this.setState({ mushroom: newData }))
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
      this.setState({ showForm: !this.state.showForm });
    }
  };

  handleClick = (msh) => {
    this.setState({ selectedMsh: msh });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    // console.log("value", typeof value);
    // console.log("name", name);
    console.log(this.state);
    this.setState({ [name]: value });
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
      .then((newData) => console.log(newData))
      .catch((error) => console.error("Request failed", error));
  };

  render() {
    return (
      <div className="app">
        <Header handleForm={this.handleForm} />
        <main>
          {!this.state.selectedMsh.id && (
            <button className="create-button" onClick={() => this.handleForm()}>
              Create a new mushroom
            </button>
          )}
          {this.state.showForm && (
            <Form
              handleSubmit={this.handleSubmit}
              handleForm={this.handleForm}
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
                handleForm={this.handleForm}
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
