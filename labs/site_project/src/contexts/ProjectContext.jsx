import React, { createContext, useContext, useReducer, useEffect } from "react";

const STORAGE_KEY = "project-management-app";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

// Начальное состояние
const initialState = {
  projects: [
    {
      id: 1,
      title: "Веб-приложение для управления задачами",
      description:
        "Описание приложения. Много текста",
      status: "active",
      tasks: {
        todo: 1,
        inProgress: 1,
        done: 1,
      },
    },
    {
      id: 2,
      title: "Мобильное приложение",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At eveniet nulla error quos temporibus animi provident ea nobis hic quod explicabo, quidem consequuntur cupiditate minus consequatur velit doloribus expedita eos.",
      status: "active",
      tasks: {
        todo: 0,
        inProgress: 1,
        done: 0,
      },
    },
    {
      id: 3,
      title: "ерции",
      description:
       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At eveniet nulla error quos temporibus animi provident ea nobis hic quod explicabo, quidem consequuntur cupiditate minus consequatur velit doloribus expedita eos.",
      status: "completed",
      tasks: {
        todo: 0,
        inProgress: 0,
        done: 1,
      },
    },
  ],
  tasks: [
    {
      id: 1,
      projectId: 1,
      title: "Проектирование архитектуры базы данных",
      description:
         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At eveniet nulla error quos temporibus animi provident ea nobis hic quod explicabo, quidem consequuntur cupiditate minus consequatur velit doloribus expedita eos.",
      assignee: "Алексей Петров",
      status: "done",
    },
    {
      id: 2,
      projectId: 1,
      title: "Реализация компонента",
      description: "Текст...",
      assignee: "Мария Сидорова",
      status: "inProgress",
    },
    {
      id: 3,
      projectId: 1,
      title: "Интеграция",
      description: "Текст...",
      assignee: "Иван Козлов",
      status: "todo",
    },
    {
      id: 4,
      projectId: 2,
      title: "Дизайн мобильного приложения",
      description: "Текст...",
      assignee: "Ольга Новикова",
      status: "inProgress",
    },
    {
      id: 5,
      projectId: 3,
      title: "Настройка сервера",
      description: "Текст...",
      assignee: "Дмитрий Волков",
      status: "done",
    },
  ],
};

const ACTION_TYPES = {
  ADD_PROJECT: "ADD_PROJECT",
  UPDATE_PROJECT: "UPDATE_PROJECT",
  DELETE_PROJECT: "DELETE_PROJECT",
  ADD_TASK: "ADD_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  DELETE_TASK: "DELETE_TASK",
  UPDATE_TASK_STATUS: "UPDATE_TASK_STATUS",
  LOAD_STATE: "LOAD_STATE",
};

const projectReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case ACTION_TYPES.LOAD_STATE:
      return {
        ...state,
        ...action.payload,
      };

    case ACTION_TYPES.ADD_PROJECT:
      newState = {
        ...state,
        projects: [...state.projects, action.payload],
      };
      break;

    case ACTION_TYPES.UPDATE_PROJECT:
      newState = {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.id
            ? { ...project, ...action.payload.updates }
            : project
        ),
      };
      break;

    case ACTION_TYPES.DELETE_PROJECT:
      newState = {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
        tasks: state.tasks.filter((task) => task.projectId !== action.payload),
      };
      break;

    case ACTION_TYPES.ADD_TASK:
      newState = {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
      break;

    case ACTION_TYPES.UPDATE_TASK:
      newState = {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task
        ),
      };
      break;

    case ACTION_TYPES.DELETE_TASK:
      newState = {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
      break;

    case ACTION_TYPES.UPDATE_TASK_STATUS:
      newState = {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, status: action.payload.newStatus }
            : task
        ),
      };
      break;

    default:
      return state;
  }

  saveState(newState);
  return newState;
};

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  useEffect(() => {
    const savedState = loadState();
    if (savedState) {
      dispatch({ type: ACTION_TYPES.LOAD_STATE, payload: savedState });
    }
  }, []);

  const addProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: Date.now(),
      tasks: {
        todo: 0,
        inProgress: 0,
        done: 0,
      },
    };
    dispatch({ type: ACTION_TYPES.ADD_PROJECT, payload: newProject });
  };

  const updateProject = (projectId, updates) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_PROJECT,
      payload: { id: projectId, updates },
    });
  };

  const deleteProject = (projectId) => {
    dispatch({ type: ACTION_TYPES.DELETE_PROJECT, payload: projectId });
  };

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now(),
    };
    dispatch({ type: ACTION_TYPES.ADD_TASK, payload: newTask });
  };

  const updateTask = (taskId, updates) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_TASK,
      payload: { id: taskId, updates },
    });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: ACTION_TYPES.DELETE_TASK, payload: taskId });
  };

  const updateTaskStatus = (taskId, newStatus) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_TASK_STATUS,
      payload: { taskId, newStatus },
    });
  };

  const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: ACTION_TYPES.LOAD_STATE, payload: initialState });
  };

  const exportData = () => {
    const data = {
      projects: state.projects,
      tasks: state.tasks,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  };

  const importData = (jsonData) => {
    try {
      const data = JSON.parse(jsonData);
      dispatch({ type: ACTION_TYPES.LOAD_STATE, payload: data });
      return true;
    } catch (error) {
      console.error("Error importing data:", error);
      return false;
    }
  };

  const getProjectTasks = (projectId) => {
    return state.tasks.filter((task) => task.projectId === projectId);
  };

  const getProjectById = (projectId) => {
    return state.projects.find((project) => project.id === projectId);
  };

  const value = {
    projects: state.projects,
    tasks: state.tasks,
    addProject,
    updateProject,
    deleteProject,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,    
    clearStorage,
    exportData,
    importData,
    getProjectTasks,
    getProjectById,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
