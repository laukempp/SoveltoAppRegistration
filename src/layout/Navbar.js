import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
export const Navigation = props => {
  return (

  <Navbar collapseOnSelect expand="md" className="navbar bg-light">
      <Nav.Link eventKey={1} as={Link} to="/dashboard">
        <Nav.Item><h3 id="sovelto-red">{props.title}</h3></Nav.Item>
      </Nav.Link>
      
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
        <Nav className="mr-auto">
        <Nav.Link eventKey={2} as={Link} to="/dashboard/question">
          <span className="NavLink">Luo kysymyksiä</span>
        </Nav.Link>
      
      
        <Nav.Link eventKey={3} as={Link} to="/scores">
          <span className="NavLink">Tulokset</span>
        </Nav.Link>
      
        <Nav.Link className="justify-content-end" eventKey={4} as={Link} to="/logout">
          <span className="NavLink logout">Kirjaudu ulos</span>
        </Nav.Link>
     
      </Nav></Navbar.Collapse>
      </Navbar> 
     
  
    
  );
};


