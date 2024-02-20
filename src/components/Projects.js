import React, { useState, useEffect } from "react";

const PROJECTS = [
  {
    id: 1,
    title: "Project 1",
    description: "This is a description for project 1",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Project 2",
    description: "This is a description for project 2",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Project 3",
    description: "This is a description for project 3",
    image: "https://via.placeholder.com/150",
  },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(PROJECTS);
  }, []);

  return (
    <div className="projects-container">
      <div className="projects">
        {projects.map((project) => (
          <div key={project.id} className="project">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-info">{project.description}</p>
            <img src={project.image} alt="project" className="project-img" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
