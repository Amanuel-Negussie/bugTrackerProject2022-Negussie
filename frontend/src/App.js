import React, { Component } from "react";
import {BrowserRouter as Router,Route,Routes, Navigate, Link, Outlet} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg"
import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Navbar, Form, FormControl, Button, NavDropdown, Nav, Container} from 'react-bootstrap'
import $ from 'jquery';
import Popper from 'popper.js';


function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
    <>
<Navbar bg="dark" variant= "dark" expand="sm">
  <Container fluid>
    <Navbar.Brand href="/">Bug Tracker</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link href="/viewissues">View Issues</Nav.Link>
        <Nav.Link href="/changelog">Change Log</Nav.Link>
        <Nav.Link href="/roadmap">Road Map</Nav.Link>
        <NavDropdown title="Projects" id="navbarScrollingDropdown">
          <NavDropdown.Item href="/viewProjects">View All Projects</NavDropdown.Item>
          <NavDropdown.Item href="/createProject">Create New Project</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/manageProject">
            Manage Current Project
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#" disabled>
          Future Ideas
        </Nav.Link>
      </Nav>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
   <Router>
     <Routes>
       <Route path = "/viewissues" element ={<Navigate replace to="/issues"/>}  />
       <Route path = "/issues" element ={<ViewIssues/>} />
     </Routes>
   </Router>
   </>
  );
}
function Home ()
{
  return(
    <>
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="#home">Brand link</Navbar.Brand>
      </Container>
    </Navbar>
    <br />
    <Navbar bg="light">
      <Container>
        <Navbar.Brand>Brand text</Navbar.Brand>
      </Container>
    </Navbar>
    <br />
    <Navbar bg="dark">
    <Container>
      <Navbar.Brand href="#home">
        <img
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
    </Container>
    </Navbar>
    <br />
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
        React Bootstrap
        </Navbar.Brand>
      </Container>
    </Navbar>
  </>
  )
}

function ViewIssues ()
{
  return(
    <div>
      <h1> Issues </h1>
      <h4> Welcome to All Our Issues</h4>
      <Link className ="btn btn-success" to ="/issues/resolved"> Resolved</Link> |
      <Link className = "btn btn-primary"to ="/issues/unresolved"> Unresolved</Link>
    </div>
  )
}
export default App;

