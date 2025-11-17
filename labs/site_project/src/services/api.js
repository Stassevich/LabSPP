const API_BASE_URL = 'http://localhost:5239/api'; 

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const projectService = {
 
  getProjects: () => {
    return fetch(`${API_BASE_URL}/projects`).then(handleResponse);
  },

  getProject: (id) => {
    return fetch(`${API_BASE_URL}/projects/${id}`).then(handleResponse);
  },

  createProject: (projectData) => {
    return fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    }).then(handleResponse);
  },

  updateProject: (id, projectData) => {
    return fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    }).then(handleResponse);
  },

  deleteProject: (id) => {
    return fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
    });
  },

  
  getTasks: () => {
    return fetch(`${API_BASE_URL}/tasks`).then(handleResponse);
  },

  getTasksByProject: (projectId) => {
    return fetch(`${API_BASE_URL}/tasks/project/${projectId}`).then(handleResponse);
  },

  getTask: (id) => {
    return fetch(`${API_BASE_URL}/tasks/${id}`).then(handleResponse);
  },

  createTask: (taskData) => {
    return fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    }).then(handleResponse);
  },

  updateTask: (id, taskData) => {
    return fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    }).then(handleResponse);
  },

  updateTaskStatus: (id, status) => {
    return fetch(`${API_BASE_URL}/tasks/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(status),
    });
  },

  deleteTask: (id) => {
    return fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};