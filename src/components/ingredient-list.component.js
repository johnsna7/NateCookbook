import React, { Component } from "react";
import CookbookDataService from "../services/cookbook.service";
import { Link } from "react-router-dom";
import cookbookService from "../services/cookbook.service";

export default class SearchIngredients extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
    this.retrieveIngredients = this.retrieveIngredients.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveIngredient = this.setActiveIngredient.bind(this);
    this.searchByTerm = this.searchByTerm.bind(this);
    this.state = {
      ingredients: [],
      currentIngredient: null,
      currentIndex: -1,
      searchTerm: "",
    };
  }

  componentDidMount() {
    this.retrieveIngredients();
  }

  onChangeSearchTerm(e) {
    const searchTerm = e.target.value;
    this.setState({
      searchTerm: searchTerm,
    });
  }

  retrieveIngredients() {
    cookbookService
      .getAllIngredients()
      .then((response) => {
        this.setState({
          ingredients: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveIngredients();
    this.setState({
      currentIngredient: null,
      currentIndex: -1,
    });
  }

  setActiveIngredient(ingredient, index) {
    this.setState({
      currentIngredient: ingredient,
      currentIndex: index,
    });
  }

  searchByTerm() {
    CookbookDataService.searchIngredients(this.state.searchTerm)
      .then((response) => {
        this.setState({
          ingredients: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchTerm, ingredients, currentIngredient, currentIndex } =
      this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Ingredient Name"
              value={searchTerm}
              onChange={this.onChangeSearchTerm}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchByTerm}
              >
                Search Ingredients
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Ingredient List</h4>
          <ul className="list-group">
            {ingredients &&
              ingredients.map((ingredient, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveIngredient(ingredient, index)}
                  key={index}
                >
                  {ingredient.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentIngredient ? (
            <div>
              <h4>Ingredient</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentIngredient.name}
              </div>
              <div>
                <label>
                  <strong>Recipes:</strong>
                </label>{" "}
                <ul className="list-group-flush">
                  {currentIngredient.recipes.map((recipe, index) => (
                    <li className="list-group-item" key={index}>
                      {recipe.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an Ingredient...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
