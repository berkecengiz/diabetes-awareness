import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const auth = localStorage.getItem("access_token"); // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth !== null ? <Outlet /> : <Navigate to='/login' />;
};

const PublicRoute = () => {
  const auth = localStorage.getItem("access_token"); // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth === null ? <Outlet /> : <Navigate to='/' />;
};

export { PrivateRoute, PublicRoute };
