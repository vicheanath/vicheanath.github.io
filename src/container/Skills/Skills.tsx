import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./Skills.scss";
import { Skill, skillData } from "./skill";
import { Experience, experienceData } from "./experience";

const Skills: React.FC = () => {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  useEffect(() => {
    setExperience(experienceData);
    setSkills(skillData);
  }, []);

  return (
    <>
      <h2 className="head-text">Skills &amp; Experience</h2>

      <div className="app__skills-container">
        <div>
          <motion.div className="app__skills-list">
            {skills.map((skill) => (
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
                className="app__skills-tech app__flex"
                key={skill.name}
              >
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
        </div>

        {/* My Experiences */}
        <motion.div className="app__skills-exp">
          {experience.map((experience) => (
            <motion.div
              className="app__skills-exp-item"
              key={experience.startDate.toDateString()}
            >
              <div className="header">
                <div className="app__skills-exp-year">
                  <p className="bold-text">{experience.companyNames}</p>
                </div>
                <motion.div className="app__skills-exp-date">
                  <p className="p-text">
                    {experience.startDate.toDateString()} -{" "}
                    {experience.endDate.toDateString()}
                  </p>
                </motion.div>
              </div>
              <div className="body">
                <motion.div className="app__skills-exp-job-title">
                  <p className="bold-text">{experience.jobTitles}</p>
                  <p className="p-text">{experience.location}</p>
                </motion.div>
                <motion.div className="app__skills-exp-descriptions">
                  <JobDescriptionCollapsible
                    jobDescriptions={experience.jobDescriptions}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

interface JobDescriptionCollapsibleProps {
  jobDescriptions: string[];
}

const JobDescriptionCollapsible = ({
  jobDescriptions,
}: JobDescriptionCollapsibleProps) => {
  // show only 3 job descriptions
  const [showCount, setShowCount] = useState<number>(3);

  const showMore = jobDescriptions.length > showCount;

  const showMoreHandler = () => {
    setShowCount(jobDescriptions.length);
  };

  return (
    <>
      <ul>
        {jobDescriptions.slice(0, showCount).map((jobDescription, index) => (
          <li key={index}>
            <p className="p-text">{jobDescription}</p>
          </li>
        ))}
      </ul>
      {showMore && (
        <motion.div
          onClick={showMoreHandler}
          className="app__skills-exp-show-more"
        >
          <p className="p-text">Show more</p>
        </motion.div>
      )}
    </>
  );
};

const WrappedSkills = AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);

export default WrappedSkills;
