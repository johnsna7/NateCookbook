import React, { Component } from "react";
import { Link } from "react-router-dom";
import CookbookDataService from "../services/cookbook.service";

export default class Recipe extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.addIngredientToRecipe = this.addIngredientToRecipe.bind(this);

    this.state = {
      recipeId: this.props.match.params.id,
      ingredientName: "",
      submitted: false,
    };
  }

  onChangeName(e) {
    this.setState({
      ingredientName: e.target.value,
    });
  }

  addIngredientToRecipe() {
    var data = {
      recipeId: this.state.recipeId,
      name: this.state.ingredientName,
    };

    CookbookDataService.addIngredient(data)
      .then((response) => {
        this.setState({
          ingredientId: response.data.id,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/recipes/"} className="badge badge-warning">
              <button className="btn btn-success">Go Back to Recipes</button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="ingredientName">
                Name of Ingredient to Add to Recipe
              </label>
              <input
                type="text"
                className="form-control"
                id="ingredientName"
                required
                value={this.state.ingredientName}
                onChange={this.onChangeName}
                name="ingredientName"
              />
            </div>
            <button
              onClick={this.addIngredientToRecipe}
              className="btn btn-success"
            >
              Add Ingredient to Recipe
            </button>
          </div>
        )}
      </div>
    );
  }
}
