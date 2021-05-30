import React, { useContext, useState } from "react";
import { Card, Alert, Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";

function CreateCommunity() {
  const [error, setError] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [topic, setTopic] = useState();
  const [loading, setLoading] = useState(false);
  const userDetails = useContext(UserContext);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const submitUser = { name, description, topic };
      const submitUserRes = await axios.post(
        "http://localhost:3001/create-community",
        submitUser,
        { headers: { "x-auth-token": userDetails.userData.token } }
      );
      history.push("/");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      err.response.data.msg && setError(err.response.data.msg);
    }
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
              <h2 className="text-center mb-4">Create Community</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="topic">
                  <Form.Label>Topic</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </Form.Group>
                <Button className="w-100 mt-2" type="submit" disabled={loading}>
                  Create
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </>
      </div>
    </Container>
  );
}

export default CreateCommunity;
