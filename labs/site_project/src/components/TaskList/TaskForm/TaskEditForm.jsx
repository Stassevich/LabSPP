import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button } from "antd";

const { TextArea } = Input;
const { Option } = Select;

const TaskEditForm = ({ visible, onCancel, onSubmit, task, isEditing, projectId }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (task && visible) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        assignee: task.assignee,
        status: task.status
      });
    } else if (!isEditing && visible) {
      // Сброс формы для новой задачи
      form.resetFields();
      form.setFieldsValue({
        status: 'todo'
      });
    }
  }, [task, visible, form, isEditing]);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      let taskData;
      
      if (isEditing && task) {
        // Для редактирования: сохраняем все поля существующей задачи + обновленные значения
        taskData = {
          ...task, // сохраняем все оригинальные поля (включая id и projectId)
          ...values // перезаписываем обновленными значениями
        };
      } else {
        // Для создания новой задачи: используем значения формы + projectId
        taskData = {
          ...values,
          projectId: projectId
        };
      }
      
      console.log('Submitting task data:', taskData); // для отладки
      onSubmit(taskData);
    }).catch(error => {
      console.error('Form validation failed:', error);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const modalTitle = isEditing ? "Редактировать задачу" : "Создать новую задачу";

  return (
    <Modal
      title={modalTitle}
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Отмена
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {isEditing ? "Сохранить изменения" : "Создать задачу"}
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ status: 'todo' }}
      >
        <Form.Item
          name="title"
          label="Название задачи"
          rules={[{ required: true, message: 'Введите название задачи' }]}
        >
          <Input placeholder="Введите название задачи" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Описание"
          rules={[{ required: true, message: 'Введите описание задачи' }]}
        >
          <TextArea 
            placeholder="Введите описание задачи" 
            rows={4}
          />
        </Form.Item>

        <Form.Item
          name="assignee"
          label="Исполнитель"
          rules={[{ required: true, message: 'Введите исполнителя' }]}
        >
          <Input placeholder="Введите имя исполнителя" />
        </Form.Item>

        <Form.Item
          name="status"
          label="Статус"
          rules={[{ required: true, message: 'Выберите статус' }]}
        >
          <Select>
            <Option value="todo">ToDo</Option>
            <Option value="inProgress">In Progress</Option>
            <Option value="done">Done</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskEditForm;