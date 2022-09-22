import React from "react";
import { Route, Routes } from "react-router-dom";
import Page1 from "../Page1";
import Page2 from "../Page2";

const Home = () => {
  return (
    <div>
      Home page
      <Routes>
        <Route path="/home/page1" element={<Page1></Page1>}></Route>
        <Route path="/home/page2" element={<Page2></Page2>}></Route>
      </Routes>
    </div>
  );
};

export default Home;
