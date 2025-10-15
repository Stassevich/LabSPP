import { useState, useMemo } from "react";
import { Layout, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./ProjectPage.module.css";
import HeaderLayout from "../../components/Layout/Header/HeaderLayout";
import ContentLayout from "../../components/Layout/Content/ContentLayout";
import KanbanBoard from "../../components/TaskList/KanbanBoard/KanbanBoard";
import TaskForm from "../../components/TaskList/TaskForm/TaskForm";

const ProjectPage = () => {
  const [project, setProject] = useState({
    id: 1,
    title: "Project Name",
    description: "ProjectDescription",
    status: "active"
  });

  const [tasks, setTasks] = useState([
    {
      id: 1,
      projectId: 1,
      title: "Task0",
      description: "Description0",
      assignee: "People31",
      status: "todo"
    },
    {
      id: 2,
      projectId: 1,
      title: "Task2",
      description: "Description02",
      assignee: "People32",
      status: "inProgress"
    },
    {
      id: 3,
      projectId: 1,
      title: "Task3",
      description: "Description03",
      assignee: "People3",
      status: "done"
    }
  ]);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const taskStats = useMemo(() => {
    const todo = tasks.filter(task => task.status === 'todo').length;
    const inProgress = tasks.filter(task => task.status === 'inProgress').length;
    const done = tasks.filter(task => task.status === 'done').length;
    const total = tasks.length;

    return { todo, inProgress, done, total };
  }, [tasks]);

  const handleTaskCreate = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now(),
      projectId: project.id
    };

    setTasks(prevTasks => [...prevTasks, newTask]);

    setIsFormVisible(false);
  };

  const handleTaskUpdate = (taskId, newStatus) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className={styles.appContainer}>
      <Layout className={styles.layout}>
        <HeaderLayout />
        <ContentLayout>
          <div className={styles.projectContainer}>
            <div className={styles.projectHeader}>
              <h1 className={styles.projectTitle}>{project.title}</h1>
              
              <div className={styles.headerActions}>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => setIsFormVisible(true)}
                  className={styles.addButton}
                >
                  Новая задача
                </Button>
                
                <div className={styles.projectStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>{taskStats.todo}</span>
                    <span className={styles.statLabel}>ToDo</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>{taskStats.inProgress}</span>
                    <span className={styles.statLabel}>In Progress</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>{taskStats.done}</span>
                    <span className={styles.statLabel}>Done</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>{taskStats.total}</span>
                    <span className={styles.statLabel}>Всего</span>
                  </div>
                </div>
              </div>
            </div>

            <p className={styles.projectDescription}>{project.description}</p>

            <div className={styles.kanbanSection}>
              <h2 className={styles.sectionTitle}>Доска задач</h2>
              <KanbanBoard 
                tasks={tasks} 
                onTaskUpdate={handleTaskUpdate}
              />
            </div>

            <TaskForm
              visible={isFormVisible}
              onCancel={() => setIsFormVisible(false)}
              onSubmit={handleTaskCreate}
            />
          </div>
        </ContentLayout>
      </Layout>
    </div>
  );
};

export default ProjectPage;