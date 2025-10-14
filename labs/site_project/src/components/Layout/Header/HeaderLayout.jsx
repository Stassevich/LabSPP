import { Layout } from "antd";
import styles from "./HeaderLayout.module.css";

const { Header } = Layout;

const HeaderLayout = () => (
  <Header className={styles.header}>
    <div className={styles.navLeft}>
      <span className={styles.navItem}>Главная</span>
      <span className={styles.navItem}>Проекты</span>
      <span className={styles.navItem}>Профиль пользователя</span>
    </div>
    <p>Меню</p>
  </Header>
);

export default HeaderLayout;