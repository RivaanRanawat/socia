import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import PostCard from "./PostCard";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";

function Feed() {
  const { userData } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await axios.get(
        `http://localhost:3001/posts/user/${userData.user.id}`,
        {
          headers: { "x-auth-token": userData.token },
        }
      );
      console.log(res.data);
      res.data.map((post) =>
        setPosts((newPost) => [...newPost, Object.values(post)])
      );
    }
    fetchPosts();
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={2}></Col>
        <Col xs={7}>
          {posts.map((post) => (
            <PostCard post={post} />
          ))}
        </Col>
        <Col className="mt-2">
          <Card>
            <Card.Body className="d-flex flex-column align-items-center text-center">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="Profile"
                class="rounded-circle"
                width="150"
              />
              <div class="mt-3">
                <h4>Username</h4>
                <Row>
                  <Col>
                    <Card.Text as="p" className="text-secondary mb-1">
                      Posts
                    </Card.Text>
                    <Card.Text as="p">0</Card.Text>
                  </Col>
                  <Col>
                    <Card.Text as="p" className="text-secondary mb-1">
                      Communities
                    </Card.Text>
                    <Card.Text as="p">1</Card.Text>
                  </Col>
                  <Col>
                    <Card.Text as="p" className="text-secondary mb-1">
                      Karma
                    </Card.Text>
                    <Card.Text as="p">2</Card.Text>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Feed;
