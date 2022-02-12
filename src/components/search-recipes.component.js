import React, { Component } from "react";
import CookbookDataService from "../services/cookbook.service";

export default class SearchRecipes extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
    this.searchByTerm = this.searchByTerm.bind(this);
    
    this.state = {
      id: null,
      name: "",
      directions: "",
      ingredients: [],
      searchTerm: "",
      published: false,
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
          id: response.data.id,
          name: response.data.name,
          directions: response.data.directions,
          ingredients: response.data.ingredients,
          published: response.data.published,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTerm } = this.state;
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Found Recipe</h4>
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
