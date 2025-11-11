import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Button, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useProject } from "../../contexts/ProjectContext";
import styles from "./ProjectPage.module.css";
import HeaderLayout from "../../components/Layout/Header/HeaderLayout";
import ContentLayout from "../../components/Layout/Content/ContentLayout";
import KanbanBoard from "../../components/TaskList/KanbanBoard/KanbanBoard";
import TaskEditForm from "../../components/TaskList/TaskForm/TaskEditForm";

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectId = parseInt(id);

  const { 
    getProjectById, 
    getProjectTasks, 
    addTask, 
    updateTask, 
    deleteTask, 
    updateTaskStatus 
  } = useProject();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const project = getProjectById(projectId);
  const tasks = getProjectTasks(projectId);

  const taskStats = useMemo(() => {
    const todo = tasks.filter(task => task.status === 'todo').length;
    const inProgress = tasks.filter(task => task.status === 'inProgress').length;
    const done = tasks.filter(task => task.status === 'done').length;
    const total = tasks.length;

    return { todo, inProgress, done, total };
  }, [tasks]);

  // Создание новой задачи
  const handleTaskCreate = (taskData) => {
    const newTaskData = {
      ...taskData,
      projectId: projectId
    };

    addTask(newTaskData);
    setIsFormVisible(false);
    
    api.success({
      message: 'Задача создана',
      description: `Задача "${taskData.title}" успешно создана.`,
      placement: 'topRight',
    });
  };

  // Обновление статуса задачи через перетаскивание
  const handleTaskUpdate = (taskId, newStatus) => {
    updateTaskStatus(taskId, newStatus);
  };

  // Редактирование задачи
  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsEditing(true);
    setIsFormVisible(true);
  };

  // Удаление задачи
  const handleDeleteTask = (taskId) => {
    const taskToDelete = tasks.find(task => task.id === taskId);
    
    deleteTask(taskId);
    
    api.success({
      message: 'Задача удалена',
      description: `Задача "${taskToDelete?.title}" успешно удалена.`,
      placement: 'topRight',
    });
  };

  // Сохранение изменений задачи
  const handleTaskSave = (updatedData) => {
    if (isEditing && editingTask) {
      // Обновление существующей задачи
      updateTask(editingTask.id, updatedData);
      
      api.success({
        message: 'Задача обновлена',
        description: `Задача "${updatedData.title}" успешно обновлена.`,
        placement: 'topRight',
      });
    } else {
      // Создание новой задачи
      handleTaskCreate(updatedData);
    }

    // Сброс состояния формы
    handleFormClose();
  };

  // Закрытие формы
  const handleFormClose = () => {
    setIsFormVisible(false);
    setIsEditing(false);
    setEditingTask(null);
  };

  // Открытие формы для создания новой задачи
  const handleNewTask = () => {
    setEditingTask(null);
    setIsEditing(false);
    setIsFormVisible(true);
  };

  if (!project) {
    return (
      <div className={styles.appContainer}>
        <Layout className={styles.layout}>
          <HeaderLayout />
          <ContentLayout>
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <h2>Проект не найден</h2>
              <p>Проект с ID {projectId} не существует.</p>
              <Button type="primary" onClick={() => navigate('/projects')}>
                Вернуться к списку проектов
              </Button>
            </div>
          </ContentLayout>
        </Layout>
      </div>
    );
  }

  return (
    <div className={styles.appContainer}>
      {contextHolder}
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
                  onClick={handleNewTask}
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
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>

            <TaskEditForm
              visible={isFormVisible}
              onCancel={handleFormClose}
              onSubmit={handleTaskSave}
              task={editingTask}
              isEditing={isEditing}
            />
          </div>
        </ContentLayout>
      </Layout>
    </div>
  );
};

export default ProjectPage;