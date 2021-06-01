import React, { useState, useEffect, useContext } from "react";
import { Card, Alert, Form, Button, Container } from "react-bootstrap";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

function CreatePost() {
  const [error, setError] = useState();
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [selectedCommunity, setSelectedCommunity] = useState();
  const [loading, setLoading] = useState(false);
  const [communities, setCommunities] = useState([]);
  const [image, setImage] = useState();
  const history = useHistory();

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "redditClone")
        const dataRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dukvdqevm/image/upload",
          formData
        );
        imageUrl = dataRes.data.url
      }
      const submitPost = { title, description, community: selectedCommunity, imageUrl };
      console.log(selectedCommunity);
      await axios.post(
        "http://localhost:3001/create-post",
        submitPost,
        {
          headers: { "x-auth-token": userData.token },
        }
      );
      setLoading(false);
      history.push("/");
    } catch (err) {
      setLoading(false);
      err.response.data.msg && setError(err.response.data.msg);
    }
  }

  useEffect(() => {
    const fetchCommunities = async () => {
      let token = localStorage.getItem("auth-token");
      const userRes = await axios.get("http://localhost:3001/", {
        headers: { "x-auth-token": token },
      });
      setUserData({
        token,
        user: userRes.data,
      });

      const commRes = await axios.get(
        `http://localhost:3001/user/community/${userRes.data.id}`,
        {
          headers: { "x-auth-token": token },
        }
      );
      commRes.data.map((e) => setCommunities((oldArr) => [...oldArr, e.name]));
      setSelectedCommunity(commRes.data[0].name);
    };
    fetchCommunities();
  }, []);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Create Post</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.File
                    className="position-relative mt-2"
                    name="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    id="validationFormik107"
                    feedbackTooltip
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
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Community</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => setSelectedCommunity(e.target.value)}
                    required
                  >
                    {communities.map((community) => (
                      <option key={community}>{community}</option>
                    ))}
                  </Form.Control>
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

export default CreatePost;
