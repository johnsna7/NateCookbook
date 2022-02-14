import React, { Component } from "react";
import CookbookDataService from "../services/cookbook.service";
import { Link } from "react-router-dom";
import cookbookService from "../services/cookbook.service";

export default class SearchRecipes extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
    this.onChangeFilterTerm = this.onChangeFilterTerm.bind(this);
    this.retrieveRecipes = this.retrieveRecipes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveRecipe = this.setActiveRecipe.bind(this);
    this.searchByTerm = this.searchByTerm.bind(this);
    this.state = {
      recipes: [],
      currentRecipe: null,
      currentIndex: -1,
      searchTerm: "",
      filterTerm: "",
    };
  }

  componentDidMount() {
    this.retrieveRecipes();
  }

  onChangeSearchTerm(e) {
    const searchTerm = e.target.value;
    this.setState({
      searchTerm: searchTerm,
    });
  }

  onChangeFilterTerm(e) {
    const termToFilter = e.target.value;
    this.setState({
      filterTerm: termToFilter,
    });
  }

  retrieveRecipes() {
    cookbookService
      .getAllRecipes()
      .then((response) => {
        this.setState({
          recipes: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveRecipes();
    this.setState({
      currentRecipe: null,
      currentIndex: -1,
    });
  }

  setActiveRecipe(recipe, index) {
    this.setState({
      currentRecipe: recipe,
      currentIndex: index,
    });
  }

  searchByTerm() {
    CookbookDataService.searchRecipes(this.state.searchTerm)
      .then((response) => {
        this.setState({
          recipes: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchTerm, recipes, currentRecipe, currentIndex, filterTerm } =
      this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Recipe Name"
              value={searchTerm}
              onChange={this.onChangeSearchTerm}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchByTerm}
              >
                Search Recipes
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <h6>Filter Out Recipes Containing:</h6>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Filter out Ingredient"
              value={filterTerm}
              onChange={this.onChangeFilterTerm}
            />
          </div>
        </div>
        <div className="col-md-6">
          <h4>Recipe List</h4>
          <ul className="list-group">
            {recipes &&
              recipes
                .filter(
                  (recipe) =>
                    !filterTerm ||
                    !recipe.ingredients.some((ing) =>
                      ing.name.includes(filterTerm)
                    )
                )
                .map((recipe, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveRecipe(recipe, index)}
                    key={index}
                  >
                    {recipe.name}
                  </li>
                ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentRecipe ? (
            <div>
              <h4>Recipe</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentRecipe.name}
              </div>
              <div>
                <label>
                  <strong>Directions:</strong>
                </label>{" "}
                {currentRecipe.directions}
              </div>
              <div>
                <label>
                  <strong>Ingredients:</strong>
                </label>{" "}
                <ul className="list-group-flush">
                  {currentRecipe.ingredients.map((ingredient, index) => (
                    <li className="list-group-item" key={index}>
                      {ingredient.name}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to={"/recipes/" + currentRecipe.id}
                className="badge badge-warning"
              >
                <button className="btn btn-success">
                  Add Ingredient to Recipe
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Recipe...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
