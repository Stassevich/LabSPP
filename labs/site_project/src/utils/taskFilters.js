export const TASK_STATUS = {
  ALL: 'all',
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  OVERDUE: 'overdue'
};

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

export const filterTasksByStatus = (tasks, status) => {
  const now = new Date();
  
  switch (status) {
    case TASK_STATUS.ALL:
      return tasks;
      
    case TASK_STATUS.PENDING:
      return tasks.filter(task => 
        task.status === 'pending' && 
        (!task.deadline || new Date(task.deadline) > now)
      );
      
    case TASK_STATUS.IN_PROGRESS:
      return tasks.filter(task => 
        task.status === 'in_progress' && 
        (!task.deadline || new Date(task.deadline) > now)
      );
      
    case TASK_STATUS.COMPLETED:
      return tasks.filter(task => task.status === 'completed');
      
    case TASK_STATUS.OVERDUE:
      return tasks.filter(task => 
        task.deadline && 
        new Date(task.deadline) < now && 
        task.status !== 'completed'
      );
      
    default:
      return tasks;
  }
};

export const filterTasksByPriority = (tasks, priority) => {
  if (priority === 'all') return tasks;
  return tasks.filter(task => task.priority === priority);
};

export const filterTasksByProject = (tasks, projectId) => {
  if (!projectId) return tasks;
  return tasks.filter(task => task.projectId === projectId);
};

export const searchTasks = (tasks, searchQuery) => {
  if (!searchQuery.trim()) return tasks;
  
  const query = searchQuery.toLowerCase();
  return tasks.filter(task => 
    task.title.toLowerCase().includes(query) ||
    task.description.toLowerCase().includes(query) ||
    (task.tags && task.tags.some(tag => tag.toLowerCase().includes(query)))
  );
};

export const sortTasks = (tasks, sortBy) => {
  const sortedTasks = [...tasks];
  
  switch (sortBy) {
    case 'deadline_asc':
      return sortedTasks.sort((a, b) => {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      });
      
    case 'deadline_desc':
      return sortedTasks.sort((a, b) => {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(b.deadline) - new Date(a.deadline);
      });
      
    case 'priority':
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      return sortedTasks.sort((a, b) => 
        (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
      );
      
    case 'created_date':
      return sortedTasks.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
    case 'title':
      return sortedTasks.sort((a, b) => 
        a.title.localeCompare(b.title)
      );
      
    default:
      return sortedTasks;
  }
};


export const getFilteredTasks = (tasks, filters) => {
  const {
    status = TASK_STATUS.ALL,
    priority = 'all',
    projectId = null,
    searchQuery = '',
    sortBy = 'created_date'
  } = filters;
  
  let filteredTasks = tasks;
  
  filteredTasks = filterTasksByStatus(filteredTasks, status);
  filteredTasks = filterTasksByPriority(filteredTasks, priority);
  filteredTasks = filterTasksByProject(filteredTasks, projectId);
  filteredTasks = searchTasks(filteredTasks, searchQuery);
  filteredTasks = sortTasks(filteredTasks, sortBy);
  
  return filteredTasks;
};

export const getTasksStatistics = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.status === 'completed').length;
  const inProgress = tasks.filter(task => task.status === 'in_progress').length;
  const pending = tasks.filter(task => task.status === 'pending').length;
  const overdue = tasks.filter(task => 
    task.deadline && 
    new Date(task.deadline) < new Date() && 
    task.status !== 'completed'
  ).length;
  
  return {
    total,
    completed,
    inProgress,
    pending,
    overdue,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
  };
};