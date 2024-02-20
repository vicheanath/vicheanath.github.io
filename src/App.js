import React, { useEffect } from "react";
import Navigation from "./components/navigation";
import Router from "./routes/Router";
import "./styles/App.scss";
import Cursor from "./components/Cursor";

function App() {

  const handleCheckTheme = () => {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  useEffect(() => {
    handleCheckTheme();
  }, []);
  return (
    <>
      <Router />
      <Navigation />
      <Cursor />
    </>
  );
}

export default App;
