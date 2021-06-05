import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Card, Container, Col, Row } from "react-bootstrap";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import UserContext from "../context/UserContext";

function PostCard({ post }) {
  const [count, setCount] = useState("0");
  const [isUpVoted, setIsUpVoted] = useState(false);
  const [isDownVoted, setIsDownVoted] = useState(false);
  const { userData } = useContext(UserContext);

  const calculateCounts = async () => {
    const res = await axios.get(
      `http://localhost:3001/post/get-count/${post[2]}`,
      {
        headers: { "x-auth-token": userData.token },
      }
    );
    setCount(res.data);
  };

  useEffect(() => {
    if (post[0].includes(userData.user.id)) {
      setIsUpVoted(true);
    }
    if (post[1].includes(userData.user.id)) {
      setIsDownVoted(true);
    }
    calculateCounts();
  }, []);

  const upvoteHandler = async () => {
    try {
      await axios.post(`http://localhost:3001/post/upvote/${post[2]}`, null, {
        headers: { "x-auth-token": userData.token },
      });
      calculateCounts();
      setIsDownVoted(false);
      setIsUpVoted(true);
    } catch (err) {
      console.log(err);
    }
  };

  const downvoteHandler = async () => {
    try {
      await axios.post(`http://localhost:3001/post/downvote/${post[2]}`, null, {
        headers: { "x-auth-token": userData.token },
      });
      calculateCounts();
      setIsUpVoted(false);
      setIsDownVoted(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="mt-2">
      <Card>
        <Card.Header as="p">
          Posted at <strong>s/{post[6]}</strong> by <strong>u/{post[8]}</strong>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Row>
                <Col xs={5}>
                  <AiFillCaretUp
                    size="2rem"
                    style={{
                      color: isUpVoted ? "#0000FF" : "#000",
                      cursor: "pointer",
                    }}
                    onClick={upvoteHandler}
                  />
                </Col>
                <Col>
                  <h5 className="mt-1" style={{ cursor: "default" }}>
                    {count.length == 1 ? `0${count}` : count}
                  </h5>
                </Col>
                <Col xs={5}>
                  <AiFillCaretDown
                    size="2rem"
                    style={{
                      color: isDownVoted ? "#0000FF" : "#000",
                      cursor: "pointer",
                    }}
                    onClick={downvoteHandler}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={11}>
              <Card.Title>{post[5]}</Card.Title>
              {post[7] !== "" ? (
                <a href={post[7]}>
                  <Card.Img
                    style={{ height: "20rem" }}
                    className="mt-1 mr-2"
                    variant="top"
                    src={post[7]}
                  />
                </a>
              ) : (
                <></>
              )}
              <Card.Text className="mt-1">{post[4]}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PostCard;
