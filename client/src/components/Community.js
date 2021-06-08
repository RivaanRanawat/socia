import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router";
import PostCard from "./PostCard";

function Community() {
  let { name } = useParams();
  let [posts, setPosts] = useState([]);
  let [isFollowing, setIsFollowing] = useState(false);
  let [tokena, setTokena] = useState();
  let [subscriberCount, setSubscriberCount] = useState(undefined);
  let [data, setData] = useState({
    name: undefined,
    description: undefined,
    topic: undefined,
    iconUrl: undefined,
    postCount: undefined,
    id: undefined,
  });
  useEffect(() => {
    let token = localStorage.getItem("auth-token");
    console.log(token);
    const fetchCommunityData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/community/:${name}`,
          {
            headers: { "x-auth-token": token },
          }
        );
        const communityRes = res.data;
        const postRes = await axios.get(
          `http://localhost:3001/community/posts/:${communityRes.name}`,
          {
            headers: { "x-auth-token": token },
          }
        );
        console.log(postRes.data);
        console.log(communityRes);
        console.log(communityRes._id);

        const followRes = await axios.get(
          `http://localhost:3001/isFollow/community/:${communityRes._id}`,
          {
            headers: { "x-auth-token": token },
          }
        );

        setData({
          name: communityRes.name,
          description: communityRes.description,
          iconUrl: communityRes.iconUrl,
          topic: communityRes.topic,
          postCount: communityRes.posts.length,
          id: communityRes._id,
        });
        setSubscriberCount(communityRes.subscribedBy.length);
        setTokena(token);
        setIsFollowing(followRes.data);
        postRes.data.map((post) =>
          setPosts((newPost) => [...newPost, Object.values(post)])
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchCommunityData();
  }, []);

  const handleFollow = async () => {
    console.log(isFollowing);
    try {
      if (isFollowing === false) {
        await axios.post(
          `http://localhost:3001/follow/community/:${data.id}`,
          null,
          {
            headers: { "x-auth-token": tokena },
          }
        );
      } else {
        await axios.post(
          `http://localhost:3001/unfollow/community/:${data.id}`,
          null,
          {
            headers: { "x-auth-token": tokena },
          }
        );
      }
      const followRes = await axios.get(
        `http://localhost:3001/isFollow/community/:${data.id}`,
        {
          headers: { "x-auth-token": tokena },
        }
      );
      followRes.data
        ? setSubscriberCount(subscriberCount + 1)
        : setSubscriberCount(subscriberCount - 1);
      setIsFollowing(followRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="mt-2">
      <div class="main-body">
        <Row className="gutters-sm">
          <div class="col-md-4 mb-3">
            <Card>
              <Card.Body>
                <div class="d-flex flex-column align-items-center text-center">
                  <img
                    src={
                      data.iconUrl
                        ? data.iconUrl
                        : "https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"
                    }
                    alt="Admin"
                    className="rounded-circle"
                    width="150"
                  />
                  <div class="mt-3">
                    <Card.Text as="h4">{data.name}</Card.Text>
                    {data.topic ? (
                      <Button variant="outline-primary">{data.topic}</Button>
                    ) : (
                      <></>
                    )}
                    <Card.Text as="p" className="text-secondary mb-1">
                      {data.description}
                    </Card.Text>
                    <Row>
                      <Col>
                        <Card.Text as="p" className="text-secondary mb-1">
                          Posts
                        </Card.Text>
                        <Card.Text as="p">{data.postCount}</Card.Text>
                      </Col>
                      <Col>
                        <Card.Text as="p" className="text-secondary mb-1">
                          Followers
                        </Card.Text>
                        <Card.Text as="p">{subscriberCount}</Card.Text>
                      </Col>
                    </Row>
                    <button
                      className="btn btn-primary mt-1"
                      onClick={handleFollow}
                    >
                      {!isFollowing ? "Follow" : "Unfollow"}
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div class="col-md-8">
            {posts !== [] ? (
              posts.map((post) => <PostCard post={post} />)
            ) : (
              <></>
            )}
          </div>
        </Row>
      </div>
    </Container>
  );
}

export default Community;
