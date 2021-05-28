import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import UserContext from "./context/UserContext";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const isLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:3001/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:3001/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    isLoggedIn();
  }, []);
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
