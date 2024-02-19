import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="App">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
