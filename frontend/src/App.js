import React, { Component } from "react";
import {Link,Route,Routes} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";


class App extends Component () {
  constructor(props){
    super(props);
    this.state = {
      user:null
    };
  }
  async login(user = null) {
    this.setUser(user);
  }

  async  logout() {
    this.setUser(null)
  }

  render () {
    return (
      
      <div>
         <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item" >
            { this.user ? (
              <a onClick={()=> this.setUser(null)} className="nav-link" style={{cursor:'pointer'}}>
                Logout {this.user}
              </a>
            ) : (            
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
            )}
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path={["/", "/restaurants"]} element={<RestaurantsList/>} />
          <Route 
            path="/restaurants/:id/review"
            render={(props) => (
              <AddReview {...props} user={this.user} />
            )}
          />
          <Route 
            path="/restaurants/:id"
            render={(props) => (
              <Restaurant {...props} user={this.user} />
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <Login {...props} login={this} />
            )}
          />
        </Routes>
      </div>
      </div>

    );
  }
}

export default App;
