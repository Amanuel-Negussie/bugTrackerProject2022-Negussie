import React, { Component } from "react";
import {BrowserRouter as Router,Route,Routes, Navigate, Link} from "react-router-dom"
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
      <a href="/home" className="navbar-brand">
        Restaurant Reviews
      </a>
      </nav>
   <Router>
     <Routes>
       <Route path = "/home" element ={<Home/>}  />
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

