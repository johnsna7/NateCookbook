import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddRecipe from "./components/add-recipe.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            Nate Cookbook
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/addRecipe"} className="nav-link">
                Create Recipe
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path="/addRecipe" component={AddRecipe} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
