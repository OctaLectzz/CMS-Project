//import component Bootstrap React
import { Navbar, Container, Nav } from 'react-bootstrap'
//import react router dom
import { Switch, Route, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';


//import component Home
import Home from './pages/Home'

// Authentication
import Login from './pages/authenticate/Login';
import Regiser from './pages/authenticate/Register';

// Posts //
import PostIndex from './pages/posts/Index'   // import component Post Index
import SinglePost from './pages/posts/Show';  // import component Post Show
import PostCreate from './pages/posts/Create' // import component Post Create
import PostEdit from './pages/posts/Edit'     //import component Post Edit


function App() {
  const location = useLocation();

  return (
    <div>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="sticky-top shadow">
        <Container>

          <Navbar.Brand as={Link} to="/">Postweb</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>HOME</Nav.Link>
              <Nav.Link as={Link} to="/posts" className={location.pathname === '/posts' ? 'nav-link active' : 'nav-link'}>POSTS</Nav.Link>
            </Nav>

            <Nav className="float-end">
              <Nav.Link as={Link} to="/Register" className="nav-link me-2">Register</Nav.Link>
              <Nav.Link as={Link} to="/Login" className="nav-link me-2">Login</Nav.Link>
            </Nav>

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