import { Nav, Stack, Button, Image, Overlay, Popover } from "react-bootstrap"
import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import logout from "../../images/logout.png";
import Profile from "../../images/profile.png";
import UserImage from '../../images/user.png'

const DropdownUser = ({ Logout }) => {
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
                <Popover.Body style={{width:"120px"}}>
                  <div className="d-flex flex-column justify-content-center bg-white border-0">
                    <Link to="/profile" className="text-decoration-none">
                      <div className="d-flex justify-content-center">
                       
                          <Image src={UserImage} style={{ width: "23%", marginRight:"15%"}} />
                      
                        <p
                          className="d-flex flex-column m-0 "
                          style={{ color: "#bd0707" }}
                        >
                          Profile
                        </p>
                      </div>
                    </Link>
                  </div>

                  <hr />

                  <div
                    className="d-flex flex-column justify-content-center bg-white border-0"
                    onClick={Logout} style={{cursor:"pointer"}}
                  >
                    <div className="d-flex justify-content-center ">
                      
                        <Image src={logout} style={{ width: "23%", marginRight:"12%", marginLeft:"10%" }} />
                      
                      <p
                        className="d-flex flex-column justify-content-center m-0 "
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

export default DropdownUser