import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./Skills.scss";

// Skills
const Skills = () => {
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);

  let exp = [
    {
      year: "2019",
      works: [
        {
          name: "Frontend Developer",
          company: "Google",
          desc: "Worked on Google's frontend development",
        },
        {
          name: "Backend Developer",
          company: "Facebook",
          desc: "Worked on Facebook's backend development",
        },
      ],
    },
  ];

  let skill = [
    {
      name: "React",
      icon: {
        asset: {
          _ref: "https://cdn.sanity.io/images/3do82whm/production/7e7f1f4f0e7b4b3e8b3b3b3b3b3b3b3b3b3b3b3-2000x2000.png?w=200&h=200&fit=crop",
        },
      },
      bgColor: "#61DBFB",
    },
  ];

  // fetch skills data
  useEffect(() => {

    // client.fetch(query).then((data) => setExperience(data));
    // client.fetch(skillsQuery).then((data) => setSkills(data));
    setExperience(exp);
    setSkills(skill);


  }, []);

  return (
    <>
      <h2 className="head-text">Skills &amp; Experience</h2>

      <div className="app__skills-container">
        {/* My Skills */}
        <motion.div className="app__skills-list">
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              {/* skill icon */}
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={skill.icon} alt={skill.name} />
              </div>
              {/* skill name */}
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* My Experiences */}
        <motion.div className="app__skills-exp">
          {experience.map((experience) => (
            <motion.div className="app__skills-exp-item" key={experience.year}>
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              {/* Experience works */}
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => (
                  <React.Fragment key={work.name}>
                    {/* Work Name */}
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={work.name}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    {/* Work Description */}
                    {/* <ReactTooltip
                      id={work.name}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {work.desc}
                    </ReactTooltip> */}
                  </React.Fragment>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
