import React, { useState } from 'react';
//import component Bootstrap React
import { Navbar, Container, Nav } from 'react-bootstrap'
//import react router dom
import { Switch, Route, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';


// Home
import Home from './pages/Home'

// Authentication
import Login from './pages/authenticate/Login';
import Regiser from './pages/authenticate/Register';

// Posts
import PostIndex from './pages/posts/Index'   // import component Post Index
import SinglePost from './pages/posts/Show';  // import component Post Show
import PostCreate from './pages/posts/Create' // import component Post Create
import PostEdit from './pages/posts/Edit'     //import component Post Edit


function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); 
 

  const handleLogout = () => { 
    localStorage.removeItem("token"); 
    setIsLoggedIn(false); 
    alert("Logout Successfully."); 
  };


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
              <Nav.Link as={Link} to="/contact" className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'} disabled>CONTACT</Nav.Link>
            </Nav>

            {isLoggedIn ? (
              <Nav className="float-end">
                <Nav.Link onClick={handleLogout} className="nav-link">Logout</Nav.Link>
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

        {/* Authentiation */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Regiser} />

        {/* Posts */}
        <Route exact path="/posts" component={PostIndex} />
        <Route exact path="/posts/create" component={PostCreate} />
        <Route exact path="/posts/edit/:id" component={PostEdit} />
        <Route exact path="/post/:id" component={SinglePost} />

      </Switch>
      
    </div>
  );
}

export default App;