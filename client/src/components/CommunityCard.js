import React, { useEffect } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function CommunityCard({ community }) {
  useEffect(() => {
    console.log(community);
  }, []);

  return (
    <Link to={`/community/s/${community[4]}`} style={{color: "#000", textDecoration: 'none'}}>
      <Container className="mt-2">
        <Card>
          <Card.Body>
            <Card.Title>s/{community[4]}</Card.Title>
            {community[6] !== "" ? (
              <Button variant="outline-primary" className="mt-1">
                {community[6]}
              </Button>
            ) : (
              <div></div>
            )}
            <Card.Text className="mt-1">{community[5]}</Card.Text>
            <Card.Text>
              Subscribed by {community[1].length.toString()} users
            </Card.Text>
            <Card.Text>{community[0].length.toString()} posts shared</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </Link>
  );
}

export default CommunityCard;
