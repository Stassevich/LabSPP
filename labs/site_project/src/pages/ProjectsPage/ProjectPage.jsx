import { Layout } from "antd";
import styles from "./MainPage.module.css";
import HeaderLayout from "../../components/Layout/Header/HeaderLayout";
import ContentLayout from "../../components/Layout/Content/ContentLayout";

const ProjectPage = () => (
  <div className={styles.appContainer}>
    <Layout className={styles.layout}>
      <HeaderLayout />
      <ContentLayout>
        <p>Текст</p>
      </ContentLayout>
    </Layout>
  </div>
);

export default ProjectPage;