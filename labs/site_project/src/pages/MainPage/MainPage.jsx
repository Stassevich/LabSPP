import { Layout } from "antd";
import styles from "./MainPage.module.css";
import HeaderLayout from "../../components/Layout/Header/HeaderLayout";
import ContentLayout from "../../components/Layout/Content/ContentLayout";
import FilterableProjectList from "../../components/Project/ProjectList/ProjectList";

const MainPage = () => (
  <div className={styles.appContainer}>
    <Layout className={styles.layout}>
      <HeaderLayout />
      <ContentLayout>
        <FilterableProjectList/>
      </ContentLayout>
    </Layout>
  </div>
);

export default MainPage;