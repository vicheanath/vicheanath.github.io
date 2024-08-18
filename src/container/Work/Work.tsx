import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./Work.scss";
import { Tag, Work, worksData } from "./data";

const WorkPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Tag>(Tag.ALL);
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState<Work[]>([]);
  const [filterWork, setFilterWork] = useState<Work[]>([]);

  // fetch works data
  useEffect(() => {
    setWorks(worksData);
    setFilterWork(worksData);
  }, []);

  // handle work filter
  const handleWorkFilter = (item: Tag) => {
    setActiveFilter(item);
    setAnimateCard({ y: 100, opacity: 0 });

    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });

      if (item === Tag.ALL) {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  return (
    <>
      {/* Head text */}
      <h2 className="head-text">
        My Creative <span>Portfolio</span>
      </h2>

      {/* Work Filters */}
      <div className="app__work-filter">
        {Tag.getTags().map((item: Tag, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${
              activeFilter === item ? "item-active" : ""
            }`}
          >
            {item.name}
          </div>
        ))}
      </div>

      {/* Work list */}
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div className="app__work-img app__flex">
              {/* work image */}
              <img src={work.imageUrl} alt={work.title} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                {/* View work live */}
                <a href={work.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                {/* View work code link */}
                <a href={work.codeLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            {/* work info */}
            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>
                {work.description}
              </p>

              {/* work tags */}
              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags[0].name}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

const WrappedWorkPage = AppWrap(
  MotionWrap(WorkPage, "app__work"),
  "work",
  "app__primarybg"
);
export default WrappedWorkPage;
