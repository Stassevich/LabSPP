import { Card } from "antd";
import styles from "./TaskCard.module.css";

const TaskCard = ({ task }) => {
  const getStatusColor = (status) => {
    const colors = {
      todo: '#f90bc1df',
      inProgress: '#4ea4f6ff',
      done: '#76dd00ff'
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status) => {
    const texts = {
      todo: 'ToDo',
      inProgress: 'In Progress',
      done: 'Done'
    };
    return texts[status] || status;
  };

  return (
    <Card
      className={styles.card}
      size="small"
      styles={{
        body: {
          padding: "12px"
        }
      }}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <h4 className={styles.title}>{task.title}</h4>
          <div 
            className={styles.statusBadge}
            style={{ backgroundColor: getStatusColor(task.status) }}
          >
            {getStatusText(task.status)}
          </div>
        </div>
        
        <p className={styles.description}>{task.description}</p>
        
        <div className={styles.assignee}>
          <strong>Исполнитель:</strong> {task.assignee}
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;