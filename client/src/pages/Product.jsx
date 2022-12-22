import React, { useState, useContext } from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { useQuery } from "react-query";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";

function Product() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [state] = useContext(UserContext);

  const navigate = useNavigate();

  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  let { data: products } = useQuery("productsCaches", async () => {
    const response = await API.get("/products");

    return response.daa.data;
  });

  return (
    <>
    <Container className="my-5">
      <Row className="d-flex  " >
        {products?.map((product, index) => (
          <Col key={index}>
          <Card
            style={{
              width: "19rem",
              borderRadius: "14px",
              backgroundColor: "#F6DADA",
              cursor: "pointer",
              padding: "0",
              marginTop: "3%",
            }}
            onClick={() => {
              state?.isLogin === false
                ? setShowLogin(true)
                : navigate(`/products/${product.id}`);
            }}
          >
            <Card.Img
              variant="top"
              src={product.image}
              style={{ width: "19rem" }}
            />
            <Card.Body>
              <Card.Title style={{ color: "#BD0707" }}>
                {product.title}
              </Card.Title>
              <Card.Text style={{ color: "#BD0707" }}>
                {" "}
                {formatIDR.format(product.price)}
              </Card.Text>
            </Card.Body>
          </Card>
          </Col>
        ))}
      </Row>
    </Container>
    <Login
              show={showLogin}
              onHide={() => 
                setShowLogin(false)
              }
              setShowLogin={setShowLogin}
              setShowRegister={setShowRegister}
            />
            <Register
              show={showRegister}
              onHide={() => 
                setShowRegister(false)
              }
              setShowRegister={setShowRegister}
              setShowLogin={setShowLogin}
            />
            </>
  );
}
export default Product;
