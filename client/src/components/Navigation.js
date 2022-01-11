import { useMutation, useQuery } from 'react-query'
import {Navbar, Tab, Tabs, Carousel, Spinner, Form, FormControl, Button, NavDropdown, Nav, Container} from 'react-bootstrap'
import {BrowserRouter as Router,Route,Routes, Navigate, Link, Outlet, BrowserRouter} from "react-router-dom"
import {logout} from './login'




const Navigation = () => {
    const { mutateAsync } = useMutation(logout, () => {})
    useQuery('userInfo', () => {})
  
    const userInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null
  
    const logoutHandler = () => {
      mutateAsync({})
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
           
          </Nav>
          <Nav.Link onClick = {logoutHandler}  href="/logout">Logout</Nav.Link>
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
      )

}
export default Navigation 


function ViewIssues ()
{
  return(
    <div>
      <h1> Issues </h1>
      <h4> Welcome to All Our Issues</h4>
      <Spinner animation="border" variant="primary" />
      <Link className ="btn btn-success" to ="/issues/resolved"> Resolved</Link> |
      <Link className = "btn btn-primary"to ="/issues/unresolved"> Unresolved</Link>
    </div>
  )
}


function Trial ()
{
  return (
  <>
  <Carousel variant="dark">
  <Carousel.Item>
    <img
      className="d-block w-50 rounded mx-auto"
      src="bug-icon.png"
      alt="First slide"
     
    />
    <Carousel.Caption>
      <h3>This is a bug</h3>
      <p>Bugs are cool and so are you.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
       className="d-block w-50 rounded mx-auto"
       src="bug-icon.png"
       alt="First slide"
       width={100}
       height={600}
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-50 rounded mx-auto"
      src="bug-icon.png"
      alt="First slide"
      width={100}
      height={600}
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
</>
  )
    }

