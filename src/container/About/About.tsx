import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./About.scss";
import { About, aboutData } from "./data";

const AboutPage: React.FC = () => {
  const [abouts, setAbouts] = useState<About[]>([]);

  useEffect(() => {
    setAbouts(aboutData);
  }, []);

  return (
    <>
      <h2 className="head-text">
        Develop intuitive and <span>user-friendly</span> software
        <br />
        through <span>clean</span>, <span>maintainable</span>, and
        <span>testable code</span>.
      </h2>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profiles-item"
            key={about.title + index}
          >
            {/* image */}
            <img src={about.imgUrl} alt={about.title} />
            {/* title */}
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            {/* description */}
            <p className="p-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

const WrappedAboutPage = AppWrap(
  MotionWrap(AboutPage, "app__about"),
  "about",
  "app__whitebg"
);

export default WrappedAboutPage;
