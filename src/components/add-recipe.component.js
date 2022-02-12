import React, { Component } from "react";
import CookbookDataService from "../services/cookbook.service";

export default class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDirections = this.onChangeDirections.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.newRecipe = this.newRecipe.bind(this);
    
    this.state = {
      id: null,
      name: "",
      directions: "", 
      published: false,
      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDirections(e) {
    this.setState({
      directions: e.target.value
    });
  }

  saveRecipe() {
    var data = {
      name: this.state.name,
      directions: this.state.directions
    };

    CookbookDataService.createRecipe(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          directions: response.data.directions,
          published: response.data.published,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  newRecipe() {
    this.setState({
      id: null,
      name: "",
      directions: "",
      published: false,
      submitted: false
    });
  }
  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newRecipe}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="directions">Directions</label>
              <input
                type="text"
                className="form-control"
                id="directions"
                required
                value={this.state.directions}
                onChange={this.onChangeDirections}
                name="directions"
              />
            </div>
            <button onClick={this.saveRecipe} className="btn btn-success">
              Create Recipe
            </button>
          </div>
        )}
      </div>
    );
  }
}
