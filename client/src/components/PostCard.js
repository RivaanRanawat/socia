import React, { useEffect, useState } from "react";
import { Card, Container, Col, Row } from "react-bootstrap";
import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";

function PostCard({ post }) {
  const [count, setCount] = useState("0");

  return (
    <Container className="mt-2">
      <Row>
        <Col xs={2}></Col>
        <Col xs={7}>
          <Card>
            <Card.Header as="p">
              Posted at <strong>r/{post[6]}</strong> by{" "}
              <strong>u/{post[8]}</strong>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Row>
                    <Col xs={5}>
                      <BiUpvote
                        size="2rem"
                        style={{ color: "#000", cursor: "pointer" }}
                        onClick={() => console.log("hi")}
                      />
                    </Col>
                    <Col>
                      <h5 className="mt-1" style={{ cursor: "default" }}>
                        {count}
                      </h5>
                    </Col>
                    <Col xs={5}>
                      <BiDownvote
                        size="2rem"
                        style={{ color: "#000", cursor: "pointer" }}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col xs={11}>
                  <Card.Title>{post[5]}</Card.Title>
                  {post[7] != "" ? (
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
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default PostCard;
