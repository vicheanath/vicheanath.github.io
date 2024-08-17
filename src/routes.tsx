import { createRoutesFromElements, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import About from "./pages/About";
import Contact from "./pages/Contact";

const routes = createRoutesFromElements(
  <Route path="/" element={<MainLayout />}>
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
  </Route>
);

export default routes;
