import React from "react";
import Navigation from "./components/navigation";
import Router from "./routes/Router";
import "./styles/App.scss";

function App() {
  return (
    <>
      <Router />
      <Navigation />
    </>
  );
}

export default App;
