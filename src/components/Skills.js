import React from "react";

const SKILLS = [
  {
    name: "HTML",
    image: require("../assets/skills/html.png"),
    percentage: 90,
  },
  {
    name: "CSS",
    image: require("../assets/skills/css.png"),
    percentage: 90,
  },
  {
    name: "Javascript",
    image: require("../assets/skills/javascript.png"),
    percentage: 80,
  },
  {
    name: "React",
    image: require("../assets/skills/react.png"),
    percentage: 80,
  },
  {
    name: "Next.js",
    image: require("../assets/skills/nextjs.png"),
    percentage: 70,
  },
  {
    name: "MongoDB",
    image: require("../assets/skills/mongodb.png"),
    percentage: 70,
  },
  {
    name: "Python",
    image: require("../assets/skills/python.png"),
    percentage: 60,
  },
  {
    name: "Django",
    image: require("../assets/skills/django.png"),
    percentage: 60,
  },
];

const Skills = () => {
  return (
    <div className="container">
      <div className="skills">
        <div className="skills-content">
          <div className="skills-header">
            <h1>Skills</h1>
          </div>
          <div className="skills-list">
            {SKILLS.map((skill, index) => (
              <div className="skill" key={index}>
                <img src={skill.image} alt={skill.name} />
                <h2>{skill.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
