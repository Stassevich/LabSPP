import React from "react";
import { Layout, Card, Row, Col } from "antd";
import styles from './MainPage.module.css';
import HeaderLayout from "../../components/Layout/Header/HeaderLayout";
import ContentLayout from "../../components/Layout/Content/ContentLayout";
import FooterLayout from "../../components/Layout/Footer/FooterLayout";

const cardData = [
  {
    id: 1,
    title: "Продукт 1",
    description: "Отличный продукт с множеством функций",
    price: "1000 руб.",
    image: "https://via.placeholder.com/300",
    actions: ["Купить", "В избранное"]
  },
  {
    id: 2,
    title: "Продукт 2",
    description: "Премиум качество по доступной цене",
    price: "2000 руб.",
    image: "https://via.placeholder.com/300",
    actions: ["Купить", "Подробнее"]
  },
  {
    id: 3,
    title: "Продукт 3",
    description: "Идеальное решение для ваших задач",
    price: "1500 руб.",
    image: "https://via.placeholder.com/300",
    actions: ["Купить"]
  },
  {
    id: 4,
    title: "Продукт 4",
    description: "Новинка этого сезона",
    price: "2500 руб.",
    image: "https://via.placeholder.com/300",
    actions: ["Предзаказ", "Узнать больше"]
  },
  {
    id: 5,
    title: "Продукт 5",
    description: "Бестселлер месяца",
    price: "1800 руб.",
    image: "https://via.placeholder.com/300",
    actions: ["Купить", "Отзывы"]
  },
  {
    id: 6,
    title: "Продукт 6",
    description: "Ограниченная серия",
    price: "3000 руб.",
    image: "https://via.placeholder.com/300",
    actions: ["Купить сейчас"]
  }
];

const MainPage = () => (
  <div className={styles.appContainer}>
    <Layout className={styles.layout}>
      <HeaderLayout />
      <ContentLayout>
        <h1>Наши продукты</h1>
        <p>Широкий ассортимент товаров для вас</p>
        
        <Row gutter={[16, 16]}>
          {cardData.map(card => (
            <Col key={card.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={card.title}
                bordered={false}
                cover={<img alt={card.title} src={card.image} />}
                actions={card.actions.map((action, index) => (
                  <span key={index}>{action}</span>
                ))}
              >
                <p>{card.description}</p>
                <p><strong>{card.price}</strong></p>
              </Card>
            </Col>
          ))}
        </Row>
      </ContentLayout>
      <FooterLayout />
    </Layout>
  </div>
);

export default MainPage;