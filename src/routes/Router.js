import React from "react";
import { Routes, Route } from "react-router-dom";
import Approach from "../pages/approach";
import Services from "../pages/services";
import About from "../pages/about";
import Layout from "../components/Layout";
import Home from "../pages/home";
import CaseStudies from "../pages/caseStudies";

const Router = ({dimensions}) => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home dimensions={dimensions} />} />
        {/* <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/approach" element={<Approach />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about-us" element={<About />} /> */}
      </Route>
    </Routes>
  );
};

export default Router;
