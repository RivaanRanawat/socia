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
                src={
                  userData.user.avatar === ""
                    ? `https://image.freepik.com/free-vector/man-avatar-profile-round-icon_24640-14046.jpg`
                    : userData.user.avatar
                }
                alt="Profile"
                className="rounded-circle"
                width="150"
              />
              <div class="mt-3">
                <h4>{userData.user.username}</h4>
                <Row>
                  <Col>
                    <Card.Text as="p" className="text-secondary mb-1">
                      Posts
                    </Card.Text>
                    <Card.Text as="p">{userData.user.postCount}</Card.Text>
                  </Col>
                  <Col>
                    <Card.Text as="p" className="text-secondary mb-1">
                      Communities
                    </Card.Text>
                    <Card.Text as="p">{userData.user.communityCount}</Card.Text>
                  </Col>
                  <Col>
                    <Card.Text as="p" className="text-secondary mb-1">
                      Karma
                    </Card.Text>
                    <Card.Text as="p">0</Card.Text>
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
