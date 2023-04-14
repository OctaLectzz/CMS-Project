import React, { useState, useEffect } from 'react';
//import component Bootstrap React
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap'
//import react router dom
import { Switch, Route, Redirect, Link, useLocation } from "react-router-dom";
import axios from 'axios';

// Home //
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
import PostTag from './pages/posts/PostTag';  // import component Post Tag

// Dashboard //
import DashboardHome from './dashboard/pages/Home';
// Posts
import DashboardPost from './dashboard/pages/posts';
import CreatePost from './dashboard/pages/posts/Create';
import EditPost from './dashboard/pages/posts/Edit';
// Tags
import DashboardTag from './dashboard/pages/tags';
import CreateTag from './dashboard/pages/tags/Create';
import EditTag from './dashboard/pages/tags/Edit';


// Private Route
const Auth = ({ component: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem('token') !== null;
  return (
    <Route {...rest} render={(props) =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )}
    />
  );
}
const Guest = ({ component: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem('token') == null;
  return (
    <Route {...rest} render={(props) =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/profile',
            state: { from: props.location },
          }}
        />
      )}
    />
  );
}


function App() {

  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); 
  const [user, setUser] = useState({});
  const token = localStorage.getItem('token');

  // Logout
  const handleLogout = () => { 
    localStorage.removeItem("token"); 
    setIsLoggedIn(false); 
    alert("Logout Successfully."); 
  };

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
  
  // Dropdown
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
            <Nav className="m-auto">
              <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>HOME</Nav.Link>
              <Nav.Link as={Link} to="/posts" className={location.pathname === '/posts' || location.pathname.includes('/post') ? 'nav-link active' : 'nav-link'}>POSTS</Nav.Link>
              <Nav.Link as={Link} to="/profile" className={location.pathname.includes('/profile') ? 'nav-link active' : 'nav-link'}>PROFILE</Nav.Link>
              <Nav.Link as={Link} to="/contact" className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'} disabled>CONTACT</Nav.Link>
            </Nav>

            {isLoggedIn ? (
              <Nav className="float-end">
                {dropdown}
              </Nav>
            ) : (
              <Nav className="float-end">
                <Nav.Link as={Link} to="/Register" className={location.pathname === '/Register' ? 'nav-link active' : 'nav-link'}>Register</Nav.Link>
                <Nav.Link as={Link} to="/Login" className={location.pathname === '/Login' ? 'nav-link active fw-bold rounded' : 'nav-link  fw-bold rounded'} style={{ backgroundColor: '#ce5200' }}><i class="bi bi-box-arrow-in-right"></i> Login</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>

        </Container>
      </Navbar>


      <Switch>

        {/* Home */}
        <Route exact path="/" component={Home} />
        {/* Posts */}
        <Route exact path="/posts" component={PostIndex} />
        <Route exact path="/post/:id" component={SinglePost} />
        <Route exact path="/posts/:tag" component={PostTag} />
        {/* Authentiation */}
        <Guest exact path="/login" component={Login} />
        <Guest exact path="/register" component={Regiser} />
        <Guest exact path="/ForgotPassword" component={ForgotPassword} />
        <Guest exact path="/ResetPassword" component={ResetPassword} />
        {/* Profile */}
        <Auth exact path="/profile" component={Profile} />
        <Auth exact path="/profile/edit" component={EditProfile} />

        {/* Dashboard Home */}
        <Auth exact path="/dashboard" component={DashboardHome} />
        {/* Dashboard Posts */}
        <Auth exact path="/dashboard/posts" component={DashboardPost} />
        <Auth exact path="/dashboard/posts/create" component={CreatePost} />
        <Auth exact path="/dashboard/posts/edit/:id" component={EditPost} />
        {/* Dashboard Tags */}
        <Auth exact path="/dashboard/tags" component={DashboardTag} />
        <Auth exact path="/dashboard/tags/create" component={CreateTag} />
        <Auth exact path="/dashboard/tags/edit/:id" component={EditTag} />

      </Switch>
      
    </div>
  );

}

export default App;