export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return new Date(date).toLocaleDateString('ru-RU', defaultOptions);
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getRelativeTime = (date) => {
  const now = new Date();
  const diffTime = now - new Date(date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffTime / (1000 * 60));

  if (diffMinutes < 1) return 'только что';
  if (diffMinutes < 60) return `${diffMinutes} мин. назад`;
  if (diffHours < 24) return `${diffHours} ч. назад`;
  if (diffDays === 1) return 'вчера';
  if (diffDays === 2) return 'позавчера';
  if (diffDays < 7) return `${diffDays} дня назад`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} нед. назад`;
  
  return formatDate(date);
};

export const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

export const isPastDate = (date) => {
  return new Date(date) < new Date();
};

export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const getDaysDifference = (date1, date2) => {
  const timeDiff = new Date(date2) - new Date(date1);
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
};

export const formatDeadline = (deadline) => {
  if (!deadline) return 'Нет дедлайна';
  
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const daysDiff = getDaysDifference(today, deadlineDate);

  if (isToday(deadline)) return 'Сегодня';
  if (daysDiff === 1) return 'Завтра';
  if (daysDiff === -1) return 'Вчера';
  if (daysDiff < 0) return `Просрочено на ${Math.abs(daysDiff)} д.`;
  if (daysDiff <= 7) return `Через ${daysDiff} д.`;
  
  return formatDate(deadline);
};