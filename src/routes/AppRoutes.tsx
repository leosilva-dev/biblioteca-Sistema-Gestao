import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login } from "../pages";
import { PrivateRoute } from "./PrivateRoute";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute component={Home} />} />
      <Route path="*" element={<PrivateRoute component={Home} />} />
    </Routes>
  );
};
