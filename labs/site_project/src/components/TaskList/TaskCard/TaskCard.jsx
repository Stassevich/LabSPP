import { Card, Dropdown, Button, Modal } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "./TaskCard.module.css";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

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

  const handleDeleteClick = () => {
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    onDelete(task.id);
    setDeleteModalVisible(false);
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  const menuItems = [
    {
      key: 'edit',
      label: 'Редактировать',
      icon: <EditOutlined />,
      onClick: () => onEdit(task)
    },
    {
      key: 'delete',
      label: 'Удалить',
      icon: <DeleteOutlined />,
      onClick: handleDeleteClick,
      danger: true
    }
  ];

  return (
    <>
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
            <Dropdown 
              menu={{ items: menuItems }} 
              trigger={['click']}
              placement="bottomRight"
            >
              <Button 
                type="text" 
                icon={<MoreOutlined />} 
                size="small"
                className={styles.moreButton}
              />
            </Dropdown>
          </div>
          
          <p className={styles.description}>{task.description}</p>
          
          <div className={styles.footer}>
            <div 
              className={styles.statusBadge}
              style={{ backgroundColor: getStatusColor(task.status) }}
            >
              {getStatusText(task.status)}
            </div>
            <div className={styles.assignee}>
              <strong>Исполнитель:</strong> {task.assignee}
            </div>
          </div>
        </div>
      </Card>

      <Modal
        title="Удаление задачи"
        open={deleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Удалить"
        cancelText="Отмена"
        okType="danger"
      >
        <p>Вы уверены, что хотите удалить задачу <strong>"{task.title}"</strong>?</p>
        <p>Это действие нельзя отменить.</p>
      </Modal>
    </>
  );
};

export default TaskCard;