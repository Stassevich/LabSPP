import React, { useState } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import styles from "./ProjectList.module.css";

const ProjectList = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Project1",
      description:
        "Description1",
      tasks: {
        todo: 8,
        inProgress: 4,
        done: 33
      },
      status: "active",
    },
    {
      id: 2,
      title: "Project2",
      description:
        "Description2",
      tasks: {
        todo: 2,
        inProgress: 1,
        done: 75
      },
      status: "completed",
    },
    {
      id: 3,
      title: "Project3",
      description:
        "Description3",
      tasks: {
        todo: 15,
        inProgress: 8,
        done: 11
      },
      status: "active",
    },
  ]);

  const updateProject = (projectId, updatedData) => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId ? { ...project, ...updatedData } : project
      )
    );
  };

  const addProject = (newProject) => {
    const projectWithId = {
      ...newProject,
      id: Date.now() 
    };
    setProjects(prevProjects => [...prevProjects, projectWithId]);
  };

  return (
    <div className={styles.container}>
      {projects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
        />
      ))}
    </div>
  );
};

export default ProjectList;