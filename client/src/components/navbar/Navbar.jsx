import React, { useState, useContext,useEffect } from "react";
import { UserContext } from "../.././context/userContext"
import { useNavigate, Link } from "react-router-dom"
import { useQuery } from "react-query"
import { API } from "../../config/api"

import { Nav, Badge, Image, Stack, Navbar, Container, Button } from "react-bootstrap";
import Brandlogo from "../Brandlogo.png";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Basket from "../images/Basket.png"
import DropdownAdmin from "./dropdown/DropdownAdmin";
import DropdownUser from "./dropdown/DropdownUser";

function Navs() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [state, dispatch] = useContext(UserContext)
  const Navigate = useNavigate()

  const [pop, setPop] = useState([])
  useEffect(() => {
    API.get("/orders-id")
      .then((res) => {
        setPop(res.data.data)
      })
      .catch((err) => console.log("error", err))
  }, []) 

  const { data: order, refetch } = useQuery("ordersCache", async () => {
    if (state.isLogin === true) {
      const response = await API.get("/orders-id")
      return response.data.data
    }
  })

  let Qty = 0

  order?.map((e) => {
    Qty += e.qty
  })
  const Logout = () => {
    dispatch({
      type: "LOGOUT",
    })
    refetch()
    Navigate("/")
  }


  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand>
          <Link to="/">
          <img
            style={{ width: "70px", height: "70px" }}
            src={Brandlogo}
            alt="logo"
          />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Stack direction="horizontal" gap={3}>
            {state.isLogin === true ? (
                  <>
                    {state.user.role === "admin" ? (
                      <DropdownAdmin Logout={Logout} />
                    ) : (
                      <Stack direction="horizontal">
                        
                        <Link to="my-cart" className="m-4 position-relative">
                          <Image
                            alt=""
                            src={Basket}
                            width="35"
                            height="30"
                            className="d-inline-block align-top"
                            
                          />
                          {Qty !== {Qty} ? (
                  <Badge bg="danger" className="position-absolute top-0 start-50 rounded-circle">
                    {Qty}
                  </Badge>
                ) : null}
                        </Link>
                        <DropdownUser Logout={Logout} />
                      </Stack>
                    )}
                  </>
                  ) : (
              <>
                <Button
                  variant="outline-danger"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </Button>
                <Login
                  show={showLogin}
                  onHide={() => {
                    setShowLogin(false);
                  }}
                  setShowLogin={setShowLogin}
                  setShowRegister={setShowRegister}
                />
                <Button
                  variant="danger"
                  style={{ backgroundColor: "#BD0707" }}
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </Button>
                <Register
                  show={showRegister}
                  onHide={() => {
                    setShowRegister(false);
                  }}
                  setShowRegister={setShowRegister}
                  setShowLogin={setShowLogin}
                  
                />
              </>
            )}
          </Stack>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navs;
