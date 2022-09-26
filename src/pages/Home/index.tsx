import React from "react";
import { Outlet } from "react-router-dom";
import NewLayout from "../../components/NewLayout";

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col text-white font-normal">
      <NewLayout>
        <Outlet />
      </NewLayout>
    </div>
  );
};

export default Home;
