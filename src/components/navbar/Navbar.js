import React from 'react';
import {Navbar, Form, Nav, FormControl, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.scss'


const NavbarAR = () => {



  return (
    <Navbar className="navbar">
      <Navbar.Brand href="/">AR Beauty & MaKe Up</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/features">Tienda</Nav.Link>
        <Nav.Link href="/services">Servicios</Nav.Link>
        <Nav.Link href="/scheduler">Turnos</Nav.Link>
      </Nav>
      {
      //<Form inline>
      //  <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
      //  <Button id="btn">Search</Button>
      //</Form>
      }
    </Navbar>
  )
}


export default NavbarAR
