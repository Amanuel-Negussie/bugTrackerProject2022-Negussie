import React, { Component } from "react";
import {Link,BrowserRouter as Router,Route,Routes} from "react-router-dom"
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
      </nav>
   <Router>
     <Routes>
       <Route path = "/restaurants" element ={<p>Test</p>}  />
       <Route 
            path="/restaurants/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}/>
     </Routes>
   </Router>
   </div>
  );
}

export default App;
