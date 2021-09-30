import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Home } from "../pages/Home";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="*" component={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
};
