import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./About.scss";

// About
const About = () => {
  const [abouts, setAbouts] = useState([]);

  let about = [
    {
      title: "UI/UX Design",
      description:
        "I focus on crafting beautiful, user-driven interfaces that are easy to use and understand.",
      imgUrl: "https://cdn.sanity.io/images/3do82whm/production/7e7f1f4f0e7b4b3e8b3b3b3b3b3b3b3b3b3b3b3-2000x2000.png?w=200&h=200&fit=crop",
    },
  ];

  // fetch about data
  useEffect(() => {
    // const query = '*[_type == "abouts"]';


    // client.fetch(query).then((data) => setAbouts(data));
    setAbouts(about);
  }, []);

  return (
    <>
      {/* Heading */}
      <h2 className="head-text">
        I Know that <span>Good Design</span>
        <br />
        means <span>Good Business</span>
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

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
