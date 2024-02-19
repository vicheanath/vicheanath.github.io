import React from "react";
import Navigation from "./components/navigation";
import Router from "./routes/Router";
import "./styles/App.scss";
import Cursor from "./components/Cursor";

function App() {
  return (
    <>
      <Router />
      <Navigation />
      <Cursor />
    </>
  );
}

export default App;
