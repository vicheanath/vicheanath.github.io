import React, { useEffect } from "react";
import { gsap } from "gsap";
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

const divideSkillsToThree = (skills) => {
  const third = Math.ceil(skills.length / 3);
  return [
    skills.slice(0, third),
    skills.slice(third, third * 2),
    skills.slice(third * 2, skills.length),
  ];
};

// create loop scroll for skills section .skills-top-down .skills-middle .skills-bottom-up
const loopScroll = (element, duration) => {
  gsap.to(element, {
    y: -100,
    duration: duration,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });
};

const Skills = () => {
  useEffect(() => {
    const skillsTopDown = document.querySelectorAll(".skills-top-down");
    const skillsMiddle = document.querySelectorAll(".skills-middle");
    const skillsBottomUp = document.querySelectorAll(".skills-bottom-up");

    loopScroll(skillsTopDown, 1);
    loopScroll(skillsMiddle, 1.5);
    loopScroll(skillsBottomUp, 2);
  }, []);

  const [first, second, third] = divideSkillsToThree(SKILLS);

  return (
    <section className="skills">
      <div className="skills-top-down skill-list">
        {first.map((skill, index) => (
          <div key={index} className="skill">
            <img src={skill.image} alt={skill.name} />
          </div>
        ))}
      </div>
      <div className="skills-middle skill-list">
        {second.map((skill, index) => (
          <div key={index} className="skill">
            <img src={skill.image} alt={skill.name} />
          </div>
        ))}
      </div>
      <div className="skills-bottom-up skill-list">
        {third.map((skill, index) => (
          <div key={index} className="skill">
            <img src={skill.image} alt={skill.name} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
