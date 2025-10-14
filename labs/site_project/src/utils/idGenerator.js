let lastId = 0;

export const generateId = () => {
  return ++lastId;
};

export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const generateShortId = (prefix = '') => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `${prefix}${timestamp}${random}`;
};

export const generateTaskId = () => {
  return `task_${generateShortId()}`;
};

export const generateProjectId = () => {
  return `project_${generateShortId()}`;
};