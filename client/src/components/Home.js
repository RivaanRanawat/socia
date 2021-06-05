import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import Feed from "./Feed";
import NavBar from "./NavBar";

function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div>
      {userData.user ? (
        <>
          <Feed />
        </>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}

export default Home;
