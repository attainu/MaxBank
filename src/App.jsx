import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Accounts from "./pages/Accounts";

import NavBar from "./components/NavBar";
import CardBalance from "./components/CardBalance";
import AccountBalance from "./components/AccountBalance";

function App() {
  return (
    <div className="App">
      <NavBar />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/accounts" component={Accounts} />
        <Route exact path="/accbal" component={AccountBalance} />
        <Route exact path="/cardbal" component={CardBalance} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
