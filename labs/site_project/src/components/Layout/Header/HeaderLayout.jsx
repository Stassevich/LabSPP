import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./HeaderLayout.module.css";

const { Header } = Layout;

const HeaderLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      label: 'Главная',
    },
    {
      key: '/projects',
      label: 'Проекты',
    },
    {
      key: '/profile',
      label: 'Профиль',
    }
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Header className={styles.header}>
      <div className={styles.logo}>
        <h2>Project Manager</h2>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        className={styles.menu}
      />
    </Header>
  );
};

export default HeaderLayout;