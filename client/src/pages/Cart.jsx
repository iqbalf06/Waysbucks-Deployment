import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Stack,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import Removeicon from "../components/images/removeicon.png";

const Cart = () => {
  const [state] = useContext(UserContext);
  const navigate = useNavigate();
  const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

  const { data: order, refetch } = useQuery("ordersCache", async () => {
    if (state.isLogin === true) {
      const response = await API.get("/orders-id");
      return response.data.data;
    }
  });

  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  let handleDelete = async (id) => {
    await API.delete(`/order/` + id);
    refetch();
  };

  let Total = 0;
  let Qty = 0;

  order?.map((e) => {
    Total += e.sub_total;
    Qty += e.qty;
  });

  const { data: user } = useQuery("userssCache", async () => {
    if (state.isLogin === true) {
      const response = await API.get("/user");
      return response.data.data;
    }
  });

  // console.log("data order",order);
  const handleSubmit = useMutation(async (e) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const data = {
      ID: order[0].transaction_id,
      Name: user.fullname,
      Address: user.address,
      Phone: user.phone,
      UserID: user.id,
      Total: Total,
      Status: "Success",
    };

    refetch();
    const response = await API.patch("/transaction", data, config);
    const token = response.data.data.token;

    window.snap.pay(token, {
      onSuccess: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        navigate("/profile");
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        navigate("/profile");
      },
      onError: function (result) {
        /* You may add your own implementation here */
        console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment");
      },
    });
  });

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-nkkz_DCDEGIFjc-n";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <>
      <Container style={{ marginTop: "8%" }}>
        <Row>
          <Col>
            <Stack direction="vertical">
              <p className="fs-4 fw-bold mb-5" style={{ color: "#bd0707" }}>
                My Cart
              </p>
              <p className="fs-5 mb-0" style={{ color: "#bd0707" }}>
                Review Your Order
              </p>
            </Stack>
            <hr />
            {state.isLogin === true ? (
              <>
                {order?.map((item, index) => {
                  return (
                    <Stack direction="horizontal" className="mb-3" key={index}>
                      <Image src={item.product.image} style={{ width: "8%" }} />
                      <div className="ms-3">
                        <p className="m-0 fw-bold" style={{ color: "#bd0707" }}>
                          {item.product.title}
                        </p>

                        <p className="m-0" style={{ color: "#bd0707" }}>
                          Topping:
                          {item.topping.map((topping, index) => {
                            return <span key={index}>{topping.title}, </span>;
                          })}
                        </p>
                      </div>
                      <div className="ms-auto">
                        <p className="m-0 fw-bold" style={{ color: "#bd0707" }}>
                          {formatIDR.format(item.sub_total)}
                        </p>
                        <div
                          className="d-flex justify-content-end"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(item.id)}
                        >
                          <Image src={Removeicon} style={{ width: "20%" }} />
                        </div>
                      </div>
                    </Stack>
                  );
                })}
              </>
            ) : (
              <></>
            )}

            <hr />
            <Row>
              <Col>
                <hr />
                <Stack direction="vertical">
                  <Stack direction="horizontal">
                    <p>Sub Total</p>
                    <p className="ms-auto">{formatIDR.format(Total)}</p>
                  </Stack>
                  <Stack direction="horizontal">
                    <p>Qty</p>
                    <p className="ms-auto"> {Qty}</p>
                  </Stack>
                  <hr />
                  <Stack direction="horizontal">
                    <p>Total</p>
                    <p className="ms-auto">{formatIDR.format(Total)}</p>
                  </Stack>
                </Stack>
              </Col>
            </Row>
          </Col>
          <Col
            className="d-flex justify-content-end"
            style={{ marginTop: "10%" }}
          >
            <Form className="d-flex flex-column" style={{ width: "60%" }}>
              <Form.Control
                type="text"
                placeholder="Name"
                name="fullname"
                value={user?.fullname}
                className="mb-3"
                style={{
                  height: "40px",
                  borderColor: "#bd0707",
                  borderWidth: "3px",
                  backgroundColor: "#FFF3F7",
                }}
              />
              <Form.Control
                type="email"
                placeholder="Email"
                value={user?.email}
                name="email"
                className="mb-3"
                style={{
                  height: "40px",
                  borderColor: "#bd0707",
                  borderWidth: "3px",
                  backgroundColor: "#FFF3F7",
                }}
              />
              <Form.Control
                type="number"
                placeholder="Phone"
                value={user?.phone}
                name="phone"
                className="mb-3"
                style={{
                  height: "40px",
                  borderColor: "#bd0707",
                  borderWidth: "3px",
                  backgroundColor: "#FFF3F7",
                }}
              />
              <Form.Control
                type="number"
                placeholder="Pos Code"
                value={user?.pos_code}
                className="mb-3"
                style={{
                  height: "40px",
                  borderColor: "#bd0707",
                  borderWidth: "3px",
                  backgroundColor: "#FFF3F7",
                }}
              />
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Address"
                value={user?.address}
                className="mb-4"
                style={{
                  resize: "none",
                  borderColor: "#bd0707",
                  borderWidth: "3px",
                  backgroundColor: "#FFF3F7",
                }}
              />
              <div>
                <Button
                  variant="primary"
                  onClick={(e) => handleSubmit.mutate(e)}
                  size="md"
                  style={{
                    width: "100%",
                    color: "white",
                    fontWeight: "bold",
                    borderColor: "#bd0707",
                    backgroundColor: "#bd0707",
                  }}
                >
                  Pay
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cart;
