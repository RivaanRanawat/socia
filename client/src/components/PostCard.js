import React from "react";
import { Card, Container, Col, Row } from "react-bootstrap";
import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";

function PostCard() {
  return (
    <Container style={{ minHeight: "100vh" }} className="mt-2">
      <Row>
        <Col xs={2}></Col>
        <Col xs={7}>
          <Card>
            <Card.Header as="p">
              Posted at <strong>r/battlestations</strong> by{" "}
              <strong>u/rivaanranawat</strong>
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
                        01
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
                  <Card.Title>My Game</Card.Title>
                  <Card.Img
                    style={{ height: "20rem" }}
                    className="mt-1 mr-2"
                    variant="top"
                    src="https://c.ndtvimg.com/2020-03/bthb68ug_virat-kohli-afp_625x300_27_March_20.jpg?output-quality=60&output-format=webp&downsize=555:*"
                  />
                  <Card.Text className="mt-1">
                    This is my brilliant game lol idk how that makes sense
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>Profile or something</Col>
      </Row>
    </Container>
  );
}

export default PostCard;
