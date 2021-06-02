import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import PostCard from "./PostCard";
import axios from "axios";

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
      console.log(res.data)
      res.data.map((post) =>
        setPosts((newPost) => [...newPost, Object.values(post)])
      );
    }
    fetchPosts();
  }, []);
  
  return (
    <div>
      {posts.map((post) => (
        <PostCard post={post} />
      ))}
    </div>
  );
}

export default Feed;
