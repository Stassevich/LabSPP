import { Row, Col } from "antd";
import TaskCard from "../TaskCard/TaskCard";
import styles from "./KanbanBoard.module.css";

const KanbanBoard = ({ tasks, onTaskUpdate }) => {
  const columns = [
    { 
      id: 'todo', 
      title: 'ToDo', 
      color: '#f90bc1df' 
    },
    { 
      id: 'inProgress', 
      title: 'In Progress', 
      color: '#4ea4f6ff' 
    },
    { 
      id: 'done', 
      title: 'Done', 
      color: '#76dd00ff' 
    }
  ];

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    if (onTaskUpdate) {
      onTaskUpdate(taskId, newStatus);
    }
  };

  return (
    <div className={styles.board}>
      <Row gutter={16}>
        {columns.map(column => {
          const columnTasks = getTasksByStatus(column.id);
          
          return (
            <Col span={8} key={column.id}>
              <div 
                className={styles.column}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                <div 
                  className={styles.columnHeader}
                  style={{ borderBottomColor: column.color }}
                >
                  <h3 className={styles.columnTitle}>{column.title}</h3>
                  <span className={styles.taskCount}>
                    {columnTasks.length}
                  </span>
                </div>
                
                <div className={styles.taskList}>
                  {columnTasks.map(task => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                    >
                      <TaskCard 
                        task={task} 
                      />
                    </div>
                  ))}
                  
                  {columnTasks.length === 0 && (
                    <div className={styles.emptyState}>
                      Нет задач
                    </div>
                  )}
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default KanbanBoard;