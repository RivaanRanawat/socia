import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import UserContext from "./context/UserContext";
import CreatePost from "./components/CreatePost";
import CreateCommunity from "./components/CreateCommunity";
import Communities from "./components/Communities";
import NavBar from "./components/NavBar";
import Community from "./components/Community";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post(
        "http://localhost:3001/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenResponse.data) {
        const userRes = await axios.get("http://localhost:3001/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/create-post" component={CreatePost} />
          <Route path="/create-community" component={CreateCommunity} />
          <Route path="/communities" component={Communities} />
          <Route path="/community/s/:name" component={Community} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
