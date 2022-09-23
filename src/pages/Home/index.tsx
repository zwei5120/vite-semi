import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Page1 from "../Page1";
import Page2 from "../Page2";

const Home = () => {
  return (
    <div>
      Home page
      <Outlet />
    </div>
  );
};

export default Home;
