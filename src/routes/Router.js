import React from "react";
import { Routes, Route } from "react-router-dom";
import Approach from "../pages/approach";
import Services from "../pages/services";
import About from "../pages/About";
import Layout from "../components/Layout";
import Home from "../pages/home";
import CaseStudies from "../pages/caseStudies";

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<CaseStudies />} />
        <Route path="/education" element={<Approach />} />
        <Route path="/skills" element={<Services />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default Router;
