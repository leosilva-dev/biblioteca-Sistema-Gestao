import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Home, UserProfile, Config } from "../pages";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/Config" component={Config} />
        <Route exact path="*" component={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
};
