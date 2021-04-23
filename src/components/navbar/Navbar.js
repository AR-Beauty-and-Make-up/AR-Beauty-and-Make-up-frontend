import React from 'react';
import {Navbar, Form, Nav, FormControl, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.scss'

const NavbarAR = () => {
  return (
    <Navbar className="navbar">
      <Navbar.Brand href="#home">AR Beauty & MaKe Up</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Market</Nav.Link>
        <Nav.Link href="#pricing">Services</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button id="btn">Search</Button>
      </Form>
    </Navbar>
  )
}


export default NavbarAR
