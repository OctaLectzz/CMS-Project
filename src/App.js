import React, { useState, useEffect } from 'react';
//import component Bootstrap React
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap'
//import react router dom
import { Switch, Route, Link, useLocation } from "react-router-dom";
import axios from 'axios';


// Home
import Home from './pages/Home'

// Profile
import Profile from './pages/Profile/Profile'
import EditProfile from './pages/Profile/Edit';

// Authentication
import Login from './pages/authenticate/Login';
import Regiser from './pages/authenticate/Register';
import ForgotPassword from './pages/authenticate/ForgotPassword';
import ResetPassword from './pages/authenticate/ResetPassword';

// Posts
import PostIndex from './pages/posts/Index'   // import component Post Index
import SinglePost from './pages/posts/Show';  // import component Post Show

// Dashboard
import DashboardHome from './dashboard/pages/Home';

// Posts
import DashboardPost from './dashboard/pages/posts';
import CreatePost from './dashboard/pages/posts/Create';
import EditPost from './dashboard/pages/posts/Edit';


function App() {

  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); 
  const handleLogout = () => { 
    localStorage.removeItem("token"); 
    setIsLoggedIn(false); 
    alert("Logout Successfully."); 
  };
  const [user, setUser] = useState({});
  const token = localStorage.getItem('token');


  // useEffect User
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`http://localhost:8000/api/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      const data = response.data.data;
      setUser(data);
    };
    fetchUser();
  });
  

  const dropdown = 
    <Dropdown>
      <Dropdown.Toggle variant="dark" id="dropdownMenuButton2">
        {user.name}
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-dark">
        <Dropdown.Item as={Link} to="/dashboard">Dashboard</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>;


  return (
    <div>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="sticky-top shadow">
        <Container>

          <Navbar.Brand as={Link} to="/" className="fw-bold">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" className="mb-1 me-1" width="40" alt="logo" />
            Lotus
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>HOME</Nav.Link>
              <Nav.Link as={Link} to="/posts" className={location.pathname === '/posts' ? 'nav-link active' : 'nav-link'}>POSTS</Nav.Link>
              <Nav.Link as={Link} to="/profile" className={location.pathname === '/profile' ? 'nav-link active' : 'nav-link'}>PROFILE</Nav.Link>
              <Nav.Link as={Link} to="/contact" className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'} disabled>CONTACT</Nav.Link>
            </Nav>

            {isLoggedIn ? (
              <Nav className="float-end">
                {dropdown}
              </Nav>
            ) : (
              <Nav className="float-end">
                <Nav.Link as={Link} to="/Register" className={location.pathname === '/Register' ? 'nav-link active me-2' : 'nav-link me-2'}>Register</Nav.Link>
                <Nav.Link as={Link} to="/Login" className={location.pathname === '/Login' ? 'nav-link active me-2' : 'nav-link me-2'}>Login</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>

        </Container>
      </Navbar>


      <Switch>

        {/* Home */}
        <Route exact path="/" component={Home} />

        {/* Profile */}
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile/edit" component={EditProfile} />

        {/* Authentiation */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Regiser} />
        <Route exact path="/ForgotPassword" component={ForgotPassword} />
        <Route exact path="/ResetPassword" component={ResetPassword} />

        {/* Posts */}
        <Route exact path="/posts" component={PostIndex} />
        <Route exact path="/post/:id" component={SinglePost} />

        {/* Dashboard Home */}
        <Route exact path="/dashboard" component={DashboardHome} />

        {/* Dashboard Posts */}
        <Route exact path="/dashboard/posts" component={DashboardPost} />
        <Route exact path="/dashboard/posts/create" component={CreatePost} />
        <Route exact path="/dashboard/posts/edit/:id" component={EditPost} />

      </Switch>
      
    </div>
  );

}

export default App;