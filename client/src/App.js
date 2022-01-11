import  useEffect from "react";
import {BrowserRouter as Router,Route,Routes, Navigate, Link, Outlet, BrowserRouter} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg"
import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import {Navbar, Tab, Tabs, Carousel, Spinner, Form, FormControl, Button, NavDropdown, Nav, Container} from 'react-bootstrap'
import { useState } from 'react';
import jwt_decode from 'jwt-decode'
import {logout} from './components/login'
import Navigation from './components/Navigation'
import {ViewIssues} from './'

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import $ from 'jquery';
import Popper from 'popper.js';

const queryClient = new QueryClient()

const App = () => {
  const { mutateAsync } = useMutation(logout, () => {})
  useQuery('userInfo', () => {})

  let userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')).token
    : null

  useEffect(() => {
    window.addEventListener('storage', () => {
      if (userInfo) mutateAsync({})
    })
    window.addEventListener('click', () => {
      if (userInfo) {
        const decoded = jwt_decode(userInfo && userInfo)

        if (decoded.exp * 1000 < Date.now()) mutateAsync({})
      }
    })
    window.addEventListener('focus', () => {
      if (userInfo) {
        const decoded = jwt_decode(userInfo && userInfo)
        if (decoded.exp * 1000 < Date.now()) mutateAsync({})
      }
    })
  }, [mutateAsync, userInfo])

  return (
    <>
<Navbar bg="dark" variant= "dark" expand="md">
  <Container fluid>
    <Navbar.Brand href="/">Bug Tracker</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link href="/view-issues">View Issues</Nav.Link>
        <Nav.Link href="/change-log">Change Log</Nav.Link>
        <Nav.Link href="/roadmap">Road Map</Nav.Link>
        <NavDropdown title="Projects" id="navbarScrollingDropdown">
          <NavDropdown.Item href="/view-projects">View All Projects</NavDropdown.Item>
          <NavDropdown.Item href="/create-project">Create New Project</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/manage-project">
            Manage Current Project
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#" disabled>
          Future Ideas
        </Nav.Link>
        <Button variant="primary">Logout</Button>{' '}
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
       <Route path = "/view-issues" element ={<Navigate replace to="/issues"/>}  />
       <Route path = "/issues" element ={<ViewIssues/>} />
       <Route path = "/change-log" element = {<Trial/>}/>
     </Routes>
   </Router>
   </>
  );
}


function ToDo()
{

}


export default App;

