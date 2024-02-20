import React, { useState, useEffect } from "react";

import { gsap } from "gsap";
const PROJECTS = [
  {
    id: 1,
    title: "Location Management System",
    description: "Manage company agents and their locations.",
    image:
      "https://www.upwork.com/att/download/portfolio/persons/uid/1357319034390982656/profile/projects/files/61ba38ad-0b7a-46d3-82c2-3cb942d5dcf7",
  },
  {
    id: 2,
    title: "Customer Service Management System ",
    description: "Money deposit and withdraw system monitoring.",
    image:
      "https://www.upwork.com/att/download/portfolio/persons/uid/1357319034390982656/profile/projects/files/61ba38ad-0b7a-46d3-82c2-3cb942d5dcf7",
  },
  {
    id: 3,
    title: "HAHA855 Online Casino Betting",
    description: "Online casino betting system.",
    image:
      "https://www.upwork.com/att/download/portfolio/persons/uid/1357319034390982656/profile/projects/files/1f659c68-f8b5-4df2-bccb-b7f3f3c72e3f",
  },
];
let tl = gsap.timeline({ defaults: { duration: 1 } });

const projectAnimation = () => {
  tl.from(".projects", {
    y: 100,
    opacity: 0,
  });
  tl.from(".project", {
    y: 100,
    opacity: 0,
    stagger: 0.2,
  });
  tl.from(".project__image", {
    x: 100,
    opacity: 0,
  });
  tl.from(".project__title", {
    x: 100,
    opacity: 0,
  });
  tl.from(".project__description", {
    x: 100,
    opacity: 0,
  });
};

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(PROJECTS);
    projectAnimation();
  }, []);

  return (
    <div className="container">
      <div className="projects">
        {projects.map((project) => (
          <div key={project.id} className="project link">
            <img src={project.image} alt="project" className="project__image" />
            <h3 className="project__title">{project.title}</h3>
            <p className="project__description">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
