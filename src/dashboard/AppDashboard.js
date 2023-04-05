import React from 'react';
import { useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './AppDashboard.css'


function Dashboard() {

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (

    <>
      <Button variant="transparant" className="w-100 shadow-none text-start" onClick={handleToggleSidebar}>
        <Col xs={12} md={3} className={`sidebar ${isOpen ? 'open shadow-lg' : 'shadow-lg'}`}>
          <h3 className="fw-bold fs-5 text-center">DASHBOARD</h3>
          <hr />
          <div className="d-none d-md-block justify-content-center">
            <ul className="nav nav-pills flex-column mb-auto">
              <li class="nav-item">
                <Button as={Link} to="/dashboard" variant="transparant" className={location.pathname === '/dashboard' ? 'nav-link active link-dark' : 'nav-link link-dark'}>Home</Button>
              </li>
              <li>
                <Button as={Link} to="/dashboard/posts" variant="transparant" className={location.pathname === '/dashboard/posts' ? 'nav-link active link-dark' : 'nav-link link-dark'}>Posts</Button>
              </li>
            </ul>
          </div>
        </Col>
      </Button>

      <Col xs={12} md={10} className="main-content m-auto">
      </Col>
    </>

  );

}

export default Dashboard;
