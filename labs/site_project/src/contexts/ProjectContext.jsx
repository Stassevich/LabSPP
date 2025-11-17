import React, { createContext, useContext, useReducer, useEffect } from "react";
import { projectService } from "../services/api";

const ProjectContext = createContext();

const ACTION_TYPES = {
  SET_PROJECTS: "SET_PROJECTS",
  SET_TASKS: "SET_TASKS",
  ADD_PROJECT: "ADD_PROJECT",
  UPDATE_PROJECT: "UPDATE_PROJECT",
  DELETE_PROJECT: "DELETE_PROJECT",
  ADD_TASK: "ADD_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  DELETE_TASK: "DELETE_TASK",
  UPDATE_TASK_STATUS: "UPDATE_TASK_STATUS",
};

const projectReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case ACTION_TYPES.SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case ACTION_TYPES.ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case ACTION_TYPES.UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.id ? action.payload : project
        ),
      };
    case ACTION_TYPES.DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((project) => project.id !== action.payload),
      };
    case ACTION_TYPES.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case ACTION_TYPES.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case ACTION_TYPES.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case ACTION_TYPES.UPDATE_TASK_STATUS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, status: action.payload.newStatus }
            : task
        ),
      };
    default:
      return state;
  }
};

const initialState = {
  projects: [],
  tasks: [],
};

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  useEffect(() => {
    loadProjects();
    loadTasks();
  }, []);

  const loadProjects = async () => {
    try {
      const projects = await projectService.getProjects();
      dispatch({ type: ACTION_TYPES.SET_PROJECTS, payload: projects });
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  };

  const loadTasks = async () => {
    try {
      const tasks = await projectService.getTasks();
      dispatch({ type: ACTION_TYPES.SET_TASKS, payload: tasks });
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const addProject = async (projectData) => {
    try {
      const newProject = await projectService.createProject(projectData);
      dispatch({ type: ACTION_TYPES.ADD_PROJECT, payload: newProject });
      return newProject;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  };

  const updateProject = async (projectId, updates) => {
    try {
      const updatedProject = await projectService.updateProject(projectId, updates);
      dispatch({ type: ACTION_TYPES.UPDATE_PROJECT, payload: updatedProject });
      return updatedProject;
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await projectService.deleteProject(projectId);
      dispatch({ type: ACTION_TYPES.DELETE_PROJECT, payload: projectId });
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  };

  const addTask = async (taskData) => {
    try {
      const newTask = await projectService.createTask(taskData);
      dispatch({ type: ACTION_TYPES.ADD_TASK, payload: newTask });
      return newTask;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      const updatedTask = await projectService.updateTask(taskId, updates);
      dispatch({ type: ACTION_TYPES.UPDATE_TASK, payload: updatedTask });
      return updatedTask;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await projectService.deleteTask(taskId);
      dispatch({ type: ACTION_TYPES.DELETE_TASK, payload: taskId });
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await projectService.updateTaskStatus(taskId, newStatus);
      dispatch({
        type: ACTION_TYPES.UPDATE_TASK_STATUS,
        payload: { taskId, newStatus },
      });
    } catch (error) {
      console.error("Error updating task status:", error);
      throw error;
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