import { Card, Tag, Row, Col, Space, Progress } from "antd";
import { useProject } from "../../../contexts/ProjectContext";
import styles from "./ProjectCard.module.css";

const ProjectCard = ({ project }) => {
  const { getProjectTasks } = useProject();
  
  const projectTasks = getProjectTasks(project.id);

  const getTaskStats = () => {
    const todo = projectTasks.filter(task => task.status === 'todo').length;
    const inProgress = projectTasks.filter(task => task.status === 'inProgress').length;
    const done = projectTasks.filter(task => task.status === 'done').length;
    const total = projectTasks.length;

    return { todo, inProgress, done, total };
  };

  const getProgressPercent = () => {
    const stats = getTaskStats();
    const total = stats.total;
    return total > 0 ? Math.round((stats.done / total) * 100) : 0;
  };

  const getProgressColors = () => {
    const stats = getTaskStats();
    const total = stats.total;
    if (total === 0) return ["#cccccc"];

    const todoPercent = (stats.todo / total) * 100;
    const inProgressPercent = (stats.inProgress / total) * 100;
    const donePercent = (stats.done / total) * 100;

    return {
      "0%": "#f90bc1df",
      [`${todoPercent}%`]: "#f90bc1df",
      [`${todoPercent}%`]: "#4ea4f6ff",
      [`${todoPercent + inProgressPercent}%`]: "#4ea4f6ff",
      [`${todoPercent + inProgressPercent}%`]: "#76dd00ff",
      "100%": "#76dd00ff",
    };
  };

  const taskStats = getTaskStats();
  const progressPercent = getProgressPercent();
  const progressColors = getProgressColors();

  return (
    <Card
      className={styles.card}
      styles={{
        body: {
          padding: "20px",
        },
      }}
    >
      <Row align="middle" gutter={16}>
        <Col span={8}>
          <div className={styles.projectTitle}>{project.title}</div>
          <Tag color={project.status === "active" ? "blue" : "green"}>
            {project.status === "active" ? "В работе" : "Завершен"}
          </Tag>
        </Col>

        <Col span={8} className={styles.descriptionColumn}>
          <div className={styles.projectDescription}>{project.description}</div>
        </Col>

        <Col span={8}>
          <div className={styles.statsContainer}>
            <div className={styles.tagsContainer}>
              <Space direction="vertical" size="small">
                <div>
                  <Tag className={styles.todoTag}>
                    ToDo: {taskStats.todo}
                  </Tag>
                </div>
                <div>
                  <Tag className={styles.inProgressTag}>
                    In Progress: {taskStats.inProgress}
                  </Tag>
                </div>
                <div>
                  <Tag className={styles.doneTag}>
                    Done: {taskStats.done}
                  </Tag>
                </div>
              </Space>
            </div>

            <Progress
              type="circle"
              percent={100}
              strokeColor={progressColors}
              format={() => (
                <div className={styles.progressText}>
                  <div className={styles.progressPercent}>
                    {progressPercent}%
                  </div>
                </div>
              )}
              size={70}
              trailColor="#f0f0f0"
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ProjectCard;