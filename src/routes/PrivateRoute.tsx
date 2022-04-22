import React from "react";
import { Navigate } from "react-router-dom";
import { useBiblioteca } from "../shared/hooks/useBiblioteca";

interface IPrivateRouteProps {
  component: React.ComponentType;
}

export const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  component: RouteComponent,
}) => {
  const { isLoggedIn } = useBiblioteca();

  if (isLoggedIn) {
    return <RouteComponent />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Navigate to="/" />;
};
