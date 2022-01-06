import React, { Component } from "react";
import {BrowserRouter as Router,Route,Routes, Navigate, Link, Outlet} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg"
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
      <a href="/" className="navbar-brand">  Home  </a>
      
      
      <div class = "collapse navbar-collapse" id ="navbarSuportedContent">
        <ul class ="navbar-nav mr-auto">
          <li class = "nav-item active">
            <a class ="nav-link" href="/learn">View Issues<span class ="sr-only"></span>  </a>
          </li>
          <li class="nav-item">
        <a class="nav-link" href="#">Report Issues</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Manage Account <img src={logo} width="20" height="20"></img>
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
    </div>
      </nav>
   <Router>
     <Routes>
       <Route path = "/home" element ={<Learn/>}  />
       <Route path = "/myapps" element ={<Navigate replace to="/learn"/>}  />
       <Route path = "/learn" element ={<Learn/>} />
     </Routes>
   </Router>
   </div>
  );
}
function Home ()
{
  return(
    <div>
      <h1> Home Route </h1>
    </div>
  )
}

function Learn ()
{
  return(
    <div>
      <h1> Learn </h1>
      <h4> here are some things to learn</h4>
      <Link className ="btn btn-success" to ="/learn/course"> courses</Link> |
      <Link className = "btn btn-primary"to ="/learn/course"> bundle</Link>
    </div>
  )
}
export default App;

