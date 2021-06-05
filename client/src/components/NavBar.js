import React from "react";
import { Form, Navbar, FormControl, Nav } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="/">Socia</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="create-post">Create Post</Nav.Link>
        <Nav.Link href="create-community">Create Community</Nav.Link>
        <Nav.Link href="communities">Explore Communities</Nav.Link>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form>
        <Nav.Link href="/login" style={{color: "red"}} onClick={() => localStorage.removeItem("auth-token")}>Log Out</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
