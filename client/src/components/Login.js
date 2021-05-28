import React from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";

function Login() {
  const error = "";
  var loading = false;
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" required />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-2" type="submit">
                  Log In
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">Need an account?</div>
        </>
      </div>
    </Container>
  );
}

export default Login;
