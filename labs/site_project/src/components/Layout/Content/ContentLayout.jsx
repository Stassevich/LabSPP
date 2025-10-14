import { Layout } from "antd";
import styles from "./ContentLayout.module.css";

const { Content } = Layout;

const ContentLayout = ({ children }) => (
  <Content className={styles.content}>
    <div className={styles.contentInner}>
      {children}
    </div>
  </Content>
);

export default ContentLayout;