import { Card, Tag, Row, Col, Space, Progress } from "antd";
import styles from "./ProjectCard.module.css";

const ProjectCard = ({ project }) => {
  const getTotalTasks = (tasks) => {
    return tasks.todo + tasks.inProgress + tasks.done;
  };

  const getProgressPercent = (tasks) => {
    const total = getTotalTasks(tasks);
    return total > 0 ? Math.round((tasks.done / total) * 100) : 0;
  };

  const getProgressColors = (tasks) => {
    const total = getTotalTasks(tasks);
    if (total === 0) return ["#cccccc"];

    const todoPercent = (tasks.todo / total) * 100;
    const inProgressPercent = (tasks.inProgress / total) * 100;
    const donePercent = (tasks.done / total) * 100;

    return {
      "0%": "#f90bc1df",
      [`${todoPercent}%`]: "#f90bc1df",
      [`${todoPercent}%`]: "#4ea4f6ff",
      [`${todoPercent + inProgressPercent}%`]: "#4ea4f6ff",
      [`${todoPercent + inProgressPercent}%`]: "#76dd00ff",
      "100%": "#76dd00ff",
    };
  };

  const progressPercent = getProgressPercent(project.tasks);
  const progressColors = getProgressColors(project.tasks);

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
                    ToDo: {project.tasks.todo}
                  </Tag>
                </div>
                <div>
                  <Tag className={styles.inProgressTag}>
                    In Progress: {project.tasks.inProgress}
                  </Tag>
                </div>
                <div>
                  <Tag className={styles.doneTag}>
                    Done: {project.tasks.done}
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
