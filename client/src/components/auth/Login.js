import React, { useState, useContext } from "react"
import { UserContext } from "../../context/userContext"
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../../config/api";

const Login = ({ show, onHide, setShowRegister, setShowLogin }) =>{
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [state, dispatch] = useContext(UserContext)
  let Navigate = useNavigate()

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Insert data user to database
      const response = await API.post("/login", form);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });
        console.log("state", state);
        Navigate("/");
        console.log("Login Successfuly", response.data.data);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Wrong Email or Password
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md p-5"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="fw-bold"
          style={{ fontSize: "36px", color: "#BD0707" }}
        >
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && message}
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Group className="mb-3">
            <Form.Control
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="form-control bg-danger bg-opacity-10"
              style={{
                height: "50px",
                borderColor: "#BD0707",
                borderColor: "#BD0707",
                backgroundColor: "#E0C8C8",
                border: "2px solid #BD0707",
              }}
              type="email"
              placeholder="Email"
              value={form.email}
            />

          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              value={form.password}
              className="form-control bg-danger bg-opacity-10"
              style={{
                height: "50px",
                borderColor: "#BD0707",
                borderColor: "#BD0707",
                backgroundColor: "#E0C8C8",
                border: "2px solid #BD0707",
              }}
              type="Password"
              placeholder="Password"
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button
              className="text-white"
              variant="danger"
              size="lg"
              style={{ backgroundColor: "#BD0707" }}
              type="submit"
            >
              Login
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Link
          onClick={() => {
            setShowRegister(true);
            setShowLogin(false);
          }}
          style={{
            textDecoration: "none",
            textAlign: "center",
            color: "black",
          }}
        >
          Don't have an acccount ? Click <strong>Here</strong>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

export default Login