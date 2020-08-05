import React from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <NavBar />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
