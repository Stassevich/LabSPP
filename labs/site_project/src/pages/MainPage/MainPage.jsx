import { Layout } from "antd";
import styles from "./MainPage.module.css";
import HeaderLayout from "../../components/Layout/Header/HeaderLayout";
import ContentLayout from "../../components/Layout/Content/ContentLayout";
import ProjectList from "../../components/Project/ProjectList/ProjectList";

const MainPage = () => {
  return (
    <div className={styles.appContainer}>
      <Layout className={styles.layout}>
        <HeaderLayout />
        <ContentLayout>
          <ProjectList />
        </ContentLayout>
      </Layout>
    </div>
  );
};

export default MainPage;