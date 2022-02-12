import React, { Component } from "react";
import CookbookDataService from "../services/cookbook.service";

export default class SearchRecipes extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
    this.searchByTerm = this.searchByTerm.bind(this);
    
    this.state = {
      id: null,
      recipes: [],
      searchTerm: "",
      submitted: false
    };
  }

  onChangeSearchTerm(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  searchByTerm() {
    CookbookDataService.searchRecipes(this.state.searchTerm)
      .then(response => {
        this.setState({
            recipes: response.data,
            submitted: true  
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTerm, recipes } = this.state;
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Found Recipe(s)</h4>
            <ul className="list-group">
                {recipes &&
                recipes.map((recipe, index) => (
                    <li
                        className="list-group-item "
                        key={index}
                    >
                        <h6>{recipe.name}</h6>
                        <p>Directions: {recipe.directions}</p>
                        <p>Ingredients: {recipe.ingredients}</p>
                    </li>
                ))}
            </ul>
          </div>
        ) : (
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
        )}
      </div>
    );
  }
}
