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
    console.log(newMsh, "newMsh");
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
          const newMushrooms = data.map((msh) => {
            return msh.id === newMsh.id ? (msh = newMsh) : msh;
          });
          setData(newMushrooms);
        })
        .catch((error) => console.error("Request failed", error));
      setShowForm(!showForm);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log(form, "FORM");
  };

  console.log(data, "data");

  return (
    <div className="app">
      <Header handleForm={() => setShowForm(!showForm)} />
      <main>
        {!selectedMsh.id && (
          <button
            className="create-button"
            onClick={() => setShowForm(!showForm)}
          >
            Create a new mushroom
          </button>
        )}
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
              // handleDelete={this.handleDelete}
            />
          )
        )}
      </main>
    </div>
  );
};

export default App;

// class App extends Component {
//   state = {
//     mushrooms: [],
//     selectedMsh: {},
//     showForm: false,
//     latin_name: "",
//     common_name: "",
//     confused_with: "",
//     region: "",
//     habitat: "",
//     poisonous: false,
//     img_url: "",
//   }

//   componentDidMount = () => {
//     fetch(endPoint, {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((mushrooms) => this.setState({ mushrooms }));
//   };

//   handleForm = () => {
//     this.setState({ showForm: !this.state.showForm });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const {
//       latin_name,
//       common_name,
//       confused_with,
//       region,
//       habitat,
//       poisonous,
//       img_url,
//     } = this.state;

//     const newMsh = {
//       latin_name: latin_name,
//       common_name: [common_name],
//       confused_with: [confused_with],
//       region: [region],
//       habitat: habitat,
//       poisonous: poisonous === "true" ? true : false,
//       img_url: img_url,
//     };
//     console.log(newMsh, "newMsh");
//     if (!this.state.selectedMsh.id) {
//       console.log(this.state, "form");
//       fetch(endPoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//         mode: "cors",
//         cache: "no-cache",
//         body: JSON.stringify(newMsh),
//       })
//         .then((res) => res.json())
//         .then((newData) => this.setState({ mushroom: newData }))
//         .catch((error) => console.error("Request failed", error));
//       this.setState({ showForm: !this.state.showForm });
//     } else {
//       const url = `${endPoint}${this.state.selectedMsh.id}`;
//       fetch(url, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//         mode: "cors",
//         cache: "no-cache",
//         body: JSON.stringify(newMsh),
//       })
//         .then((res) => res.json())
//         .then((newMsh) => {
//           const newMushrooms = this.state.mushrooms.map((msh) => {
//             return msh.id === newMsh.id ? (msh = newMsh) : msh;
//           });
//           this.setState({ mushrooms: newMushrooms });
//         })
//         .catch((error) => console.error("Request failed", error));
//       this.setState({ showForm: !this.state.showForm });
//     }
//   };

//   handleClick = (msh) => {
//     this.setState({ selectedMsh: msh });
//   };

//   handleChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   handleDelete = (selectedMsh) => {
//     const url = `${endPoint}${selectedMsh.id}`;
//     fetch(url, {
//       method: "DELETE",
//     })
//       .then((res) => res.json())
//       .then((newData) => {
//         const mushrooms = [...this.state.mushrooms].filter((msh) => {
//           return msh !== selectedMsh;
//         });
//         this.setState({ mushrooms });
//       })
//       .catch((error) => console.error("Request failed", error));
//   };

//   render() {
//     return (
//       <div className="app">
//         {/* <Header handleForm={this.handleForm} /> */}
//         <main>
//           {!this.state.selectedMsh.id && (
//             <button className="create-button" onClick={() => this.handleForm()}>
//               Create a new mushroom
//             </button>
//           )}
//           {this.state.showForm && (
//             <Form
//               handleSubmit={this.handleSubmit}
//               handleForm={this.handleForm}
//               mushroom={this.state.selectedMsh}
//               handleChange={this.handleChange}
//             />
//           )}
//           {!this.state.selectedMsh.id ? (
//             <MushroomsContainer
//               mushrooms={this.state.mushrooms}
//               handleClick={this.handleClick}
//             />
//           ) : (
//             this.state.selectedMsh.id && (
//               <MushroomDetails
//                 mushroom={this.state.selectedMsh}
//                 handleForm={this.handleForm}
//                 handleDelete={this.handleDelete}
//               />
//             )
//           )}
//         </main>
//       </div>
//     );
//   }
// }

// export default App;
