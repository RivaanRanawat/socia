import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import CommunityCard from "./CommunityCard";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";

function Communities() {
  const [token, setToken] = useState();
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("auth-token");
    setToken(token);
    async function fetchCommunities() {
      const res = await axios.get(`http://localhost:3001/communities`, {
        headers: { "x-auth-token": token },
      });
      console.log(res.data);
      res.data.map((community) =>
        setCommunities((oldCommunity) => [
          ...oldCommunity,
          Object.values(community),
        ])
      );
    }
    fetchCommunities();
  }, []);

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={8}>
          {communities.map((community) => (
            <CommunityCard community={community} />
          ))}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default Communities;
