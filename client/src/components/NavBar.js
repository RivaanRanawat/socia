import React from "react";
import { Form, Navbar, Button, FormControl, Nav } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="#home">Socia</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="create-post">Create Post</Nav.Link>
        <Nav.Link href="create-community">Create Community</Nav.Link>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
