import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useProject } from "../../../contexts/ProjectContext";
import ProjectCard from "../ProjectCard/ProjectCard";
import ProjectForm from "../ProjectForm/ProjectForm";
import styles from "./ProjectList.module.css";

const ProjectList = () => {
  const { projects, addProject } = useProject();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleCreateProject = async (projectData) => {
    try {
      await addProject(projectData);
      setIsFormVisible(false);
      
      api.success({
        message: 'Проект создан',
        description: `Проект "${projectData.title}" успешно создан.`,
        placement: 'topRight',
      });
    } catch (error) {
      api.error({
        message: 'Ошибка',
        description: 'Не удалось создать проект',
        placement: 'topRight',
      });
    }
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <div className={styles.header}>
        <h1 className={styles.title}>Мои проекты</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => setIsFormVisible(true)}
          className={styles.addButton}
        >
          Новый проект
        </Button>
      </div>

      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <div 
            key={project.id} 
            className={styles.projectCardWrapper}
            onClick={() => handleProjectClick(project.id)}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <ProjectForm
        visible={isFormVisible}
        onCancel={() => setIsFormVisible(false)}
        onSubmit={handleCreateProject}
      />
    </div>
  );
};

export default ProjectList;