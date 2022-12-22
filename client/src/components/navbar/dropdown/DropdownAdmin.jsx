
import React, { useState, useRef } from "react"
import { Nav, Stack, Button, Image, Overlay, Popover } from "react-bootstrap"
import Profile from "../../images/profile.png";
import { Link } from "react-router-dom";
import AddProducticon from "../../images/addproducticon.png";
import AddTopingicon from "../../images/addtopingicon.png";
import logout from '../../images/logout.png'
import Incomeicon from '../../images/incomeicon.jpg'

const DropdownAdmin = ({ Logout }) => {
  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(null)
  const ref = useRef(null)

  const handleClick = (event) => {
    setShow(!show)
    setTarget(event.target)
  }

  return (
    <>
      <Nav className="d-flex flex-row justify-content-end">
        <Stack
          direction="horizontal"
          gap={5}
          className="d-flex flex-row justify-content-end"
        >
          <div ref={ref}>
            <Button
              onClick={handleClick}
              className="p-0 m-0 bg-transparent border-0"
              style={{ width: "70px", height: "70px" }}
            >
              <Image
                src={Profile}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "solid",
                  borderWidth: "2px",
                  borderColor: "#bd0707",
                }}
              />
            </Button>

            <Overlay
              show={show}
              target={target}
              placement="bottom-end"
              container={ref}
            >
              <Popover id="popover-contained">
                <Popover.Body style={{width:"150px"}}>
                  <div className="d-flex flex-column justify-content-center bg-white border-0 mb-3">
                    <Link to="/add-product" className="text-decoration-none">
                      <div className="d-flex justify-content-center">
                       
                          <Image src={AddProducticon} style={{ width: "13%", marginRight:"20%" }} />
                       
                        <p
                          className="d-flex flex-column justify-content-center m-0"
                          style={{ color: "#bd0707" }}
                        >
                          Add Product
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className="d-flex flex-column justify-content-center bg-white border-0" style={{marginBottom:"30%"}}>
                    <Link to="/add-toping" className="text-decoration-none">
                      <div className="d-flex">
                 
                          <Image src={AddTopingicon} style={{ width: "15%", marginRight:"15%", position:"absolute", right:"61%" }} />
                       
                        <p
                          className="d-flex flex-column justify-content-center m-0"
                          style={{ color: "#bd0707", position:"absolute", right:"16%" }}
                        >
                          Add Toping
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className="d-flex flex-column bg-white border-0" style={{marginBottom:"30%"}}>
                    <Link to="/income" className="text-decoration-none">
                      <div className="d-flex">
                 
                          <Image src={Incomeicon} style={{ width: "28%", marginRight:"15%", position:"absolute", right:"55%" }} />
                       
                        <p
                          className="d-flex flex-column justify-content-center m-0"
                          style={{ color: "#bd0707", position:"absolute", right:"17%" }}
                        >
                          Transaction
                        </p>
                      </div>
                    </Link>
                  </div>

                  <hr />

                  <div
                    className="d-flex flex-column justify-content-center bg-white border-0"
                    onClick={Logout} style={{cursor:"pointer"}}
                  >
                    <div className="d-flex ">
                     
                        <Image src={logout} style={{ width: "15%", marginRight:"20%", marginLeft:"3%" }} />
                      
                      <p
                        className="d-flex flex-column justify-content-center m-0 fw-bold"
                        style={{ color: "#bd0707" }}
                      >
                        Logout
                      </p>
                    </div>
                  </div>
                </Popover.Body>
              </Popover>
            </Overlay>
          </div>
        </Stack>
      </Nav>
    </>
  )
}

export default DropdownAdmin