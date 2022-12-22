import React, { useState, useEffect, useContext } from "react"
import { Button, Card, Col, Row, Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../data/ListProduct";
import { useMutation, useQuery } from "react-query"
import { API } from "../config/api"
import Checked from "../components/images/icons/green-check.svg"
import { UserContext } from "../context/userContext"

function DetailProduct() {
  const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;
  const { id } = useParams()
  const [state] = useContext(UserContext)
  console.log(state);
  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })

  let { data: product } = useQuery("productsCache", async () => {
    const response = await API.get("/product/" + id)

    return response.data.data
  })

  let { data: toppings } = useQuery("toppingsCache", async () => {
    const response = await API.get("/toppings")

    return response.data.data
  })

  const [toppingCheck, setToppingChecklist] = useState([])
  const [toppingPrice, setToppingPrice] = useState(0)

  const handleChecked = (id, price) => {
    let filterID = toppingCheck.filter((e) => e === id)
    if (filterID[0] !== id) {
      setToppingChecklist([...toppingCheck, id])
      setToppingPrice(toppingPrice + price)
    } else {
      setToppingChecklist(toppingCheck.filter((e) => e !== id))
      setToppingPrice(toppingPrice - price)
    }
  }

  console.log(toppingCheck)

  const navigate = useNavigate()

  const handleOnSubmit = useMutation(async (e) => {
    e.preventDefault()

    const config = {
      headers: { "Content-type": "application/json" },
    }

    const data = {
      buyer_id: state.user.id,
      product_id: product.id,
      topping_id: toppingCheck,
    }
    
    const datatrans = {
      user_id: state.user.id,
    }

    const bodytrans = JSON.stringify(datatrans)
    const response = await API.get("/my-order")
    console.log("data response", response)

    await API.post("/transaction", bodytrans)
  
    const body = JSON.stringify(data)
    await API.post("/order", body, config)

    navigate("/my-cart")
  })

  return (
    <>
    <Container style={{ marginTop: "8%" }}>
    <div>
      <Card
        className="my-5"
        border="white"
        style={{margin: "auto" }}
      >
        <Row>
          <Col md={5}>
          <Image
            style={{ width:"28rem", marginTop:"3%" }}
            src={product?.image}
          />
          </Col>
          <Col>
            <Card.Body>
              <Card.Title
                className="fw-bold"
                style={{
                  fontSize: "48px",
                  marginBottom: "20px",
                  color: "#BD0707",
                }}
              >
                {product?.title}
              </Card.Title>

              <Card.Text style={{ color: "#974A4A", fontSize: "24px" }}>
               {formatIDR.format(product?.price)}
              </Card.Text>
              <Card.Text
                className="fw-bold"
                style={{
                  color: "#974A4A",
                  fontSize: "24px",
                  marginTop: "70px",
                }}
              >
                Toping
              </Card.Text>

              <Row
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
              {toppings?.map((topping, index) => {
                return (
                <Col md={3}
                key={index}
                >

                  <div className="d-flex"
                  onClick={() => handleChecked(topping.id, topping.price)}>
                  <Image
                    src={topping.image}
                    alt=""
                    style={{
                      width: "35%"
                    }}
                  />
                  {toppingCheck.filter(
                        (element) => element === topping.id
                      )[0] ? (
                        <Image
                          src={Checked}
                          className="position-absolute ms-5"
                        />
                      ) : (
                        <Image
                          src={Checked}
                          className="position-absolute ms-5 d-none"
                        />
                      )}
                 
                    </div>
                  <p style={{ fontSize: "14px" }}>{topping.title}</p>

                </Col>

                )
              })}
               
              </Row>
              <Row>
                  <Col>
                    <p
                      className="fw-bold"
                      style={{
                        color: "#974A4A",
                        fontSize: "24px",
                        marginTop: "40px",
                      }}
                    >
                      Total
                    </p>
                  </Col>

                  <Col>
                    <p
                      className="fw-bold"
                      style={{
                        color: "#974A4A",
                        fontSize: "24px",
                        marginTop: "40px",
                        paddingLeft: "150px",
                      }}
                    >
                      {formatIDR.format(product?.price + toppingPrice)}
                    </p>
                  </Col>
                </Row>

              <div className="d-grid gap-2">
                <Button
                  className="text-white"
                  variant="danger"
                  size="lg"
                  style={{ backgroundColor: "#BD0707"}}
                  onClick={(e) => handleOnSubmit.mutate(e)}
                >
                  Add Cart
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
    </Container>
    </>
  );
}

export default DetailProduct;
