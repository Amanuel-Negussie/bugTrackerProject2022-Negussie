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
   <BrowserRouter>
   <Navigation/>
   </BrowserRouter>
  )
}


function ToDo()
{

}


export default App;

