import React, { useState, useEffect } from "react";
import { Form, Navbar, FormControl, Nav } from "react-bootstrap";
import { Redirect } from "react-router";

function NavBar() {
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(localStorage.getItem("auth-token"));
  }, []);

  if (!token) {
    return <div></div>;
  }

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
        <Nav.Link
          href="/login"
          style={{ color: "red" }}
          onClick={() => localStorage.removeItem("auth-token")}
        >
          Log Out
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
