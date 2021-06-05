import axios from "axios";
import React, { useState, useContext } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [username, setUsername] = useState();
  const [image, setImage] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      let avatar = "";
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "redditClone");
        const dataRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dukvdqevm/image/upload",
          formData
        );
        avatar = dataRes.data.url;
      }

      const newUser = { email, password, confirmPassword, username, avatar };
      await axios.post("http://localhost:3001/signup", newUser);
      const loginRes = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      setLoading(false);
      history.push("/");
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
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Profile Photo</Form.Label>
                  <Form.File
                    className="position-relative"
                    name="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    id="validationFormik107"
                    feedbackTooltip
                  />
                </Form.Group>
                <Form.Group id="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="name"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-2" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account?<Link to="/login">Log in</Link>
          </div>
        </>
      </div>
    </Container>
  );
}

export default Signup;
