import { Layout } from "antd";
import styles from "./ProfilePage.module.css";
import HeaderLayout from "../../components/Layout/Header/HeaderLayout";
import ContentLayout from "../../components/Layout/Content/ContentLayout";

const ProfilePage = () => (
  <div className={styles.appContainer}>
    <Layout className={styles.layout}>
      <HeaderLayout />
      <ContentLayout>
        <div className={styles.profileContainer}>
          <h1>Профиль пользователя</h1>
          <p>Здесь будет информация о пользователе</p>
        </div>
      </ContentLayout>
    </Layout>
  </div>
);

export default ProfilePage;