import React, { Component } from "react";
import {Link,NavLink,Route,Routes} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";


function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/restaurants" className="navbar-brand">
        Restaurant Reviews 
        </a>
        <div className="navbar-nav mr-auto">
        <li className="nav-item">
         
          </li>
        </div>

      </nav>
    </div>
  );
}

export default App;
