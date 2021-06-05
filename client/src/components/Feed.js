import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import PostCard from "./PostCard";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

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
            hi
        </Col>
      </Row>
    </Container>
  );
}

export default Feed;
