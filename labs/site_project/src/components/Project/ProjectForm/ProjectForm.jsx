import { Modal, Form, Input, Select, Button } from "antd";

const { TextArea } = Input;
const { Option } = Select;

const ProjectForm = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSubmit(values);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Создать новый проект"
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Отмена
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Создать проект
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ status: 'active' }}
      >
        <Form.Item
          name="title"
          label="Название проекта"
          rules={[{ required: true, message: 'Введите название проекта' }]}
        >
          <Input placeholder="Введите название проекта" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Описание проекта"
          rules={[{ required: true, message: 'Введите описание проекта' }]}
        >
          <TextArea 
            placeholder="Введите описание проекта" 
            rows={4}
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="Статус проекта"
          rules={[{ required: true, message: 'Выберите статус проекта' }]}
        >
          <Select>
            <Option value="active">Активный</Option>
            <Option value="completed">Завершен</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProjectForm;