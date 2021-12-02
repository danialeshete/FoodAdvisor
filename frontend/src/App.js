import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personalList: false,
      restaurantList: [],
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
        .get("/api/restaurant/")
        .then((res) => this.setState({ restaurantList: res.data }))
        .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
          .put(`/api/restaurant/${item.id}/`, item)
          .then((res) => this.refreshList());
      return;
    }
    axios
        .post("/api/restaurant/", item)
        .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
        .delete(`/api/restaurant/${item.id}/`)
        .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", ratings: 5, personalList: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayPersonalList = (status) => {
    if (status) {
      return this.setState({ personalList: true });
    }

    return this.setState({ personalList: false});
  };

  renderTabList = () => {
    return (
        <div className="nav nav-tabs">
        <span
            onClick={() => this.displayPersonalList(true)}
            className={this.state.personalList ? "nav-link active" : "nav-link"}
        >
          Personal List
        </span>
          <span
              onClick={() => this.displayPersonalList(false)}
              className={this.state.personalList ? "nav-link" : "nav-link active"}
          >
          Public List
        </span>
        </div>
    );
  };

  renderItems = () => {
    const { personalList } = this.state;
    const newItems = this.state.restaurantList.filter(
        (item) => item.personalList === personalList
    );

    return newItems.map((item) => (
        <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
        >
        <span
            className={`restaurant-title mr-2 ${
                this.state.personalList ? "personalList-restaurant" : ""
                }`}
            title={item.description}
        >
          {item.title}
        </span>
          <span>
          <button
              className="btn btn-secondary mr-2"
              onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
              className="btn btn-danger"
              onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
        </li>
    ));
  };

  render() {
    return (
        <main className="container">
          <h1 className="text-white text-uppercase text-center my-4">Foodadvisor</h1>
          <div className="row">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="card p-3">
                <div className="mb-4">
                  <button
                      className="btn btn-primary"
                      onClick={this.createItem}
                  >
                    Add Restaurant
                  </button>
                </div>
                {this.renderTabList()}
                <ul className="list-group list-group-flush border-top-0">
                  {this.renderItems()}
                </ul>
              </div>
            </div>
          </div>
          {this.state.modal ? (
              <Modal
                  activeItem={this.state.activeItem}
                  toggle={this.toggle}
                  onSave={this.handleSubmit}
              />
          ) : null}
        </main>
    );
  }
}

export default App;