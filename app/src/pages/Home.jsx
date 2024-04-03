import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Header } from "../components";

const Home = () => {
  const user = useSelector((state) => state.user.value);

  return (
    <React.Fragment>
      {/* Header section */}
      <Header />
      <Outlet />
    </React.Fragment>
  );
};

export default Home;
