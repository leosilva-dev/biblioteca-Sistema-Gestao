import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, UserProfile, Config } from "../pages";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/Config" element={<Config />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};
