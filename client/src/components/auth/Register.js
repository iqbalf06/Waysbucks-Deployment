import { React, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import { Alert } from "react-bootstrap";

const Register = ({ show, onHide, setShowRegister, setShowLogin }) => {
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

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
      const response = await API.post("/register", form);
      console.log("Sign Up Successfuly", response.data.data);
      setShowRegister(false);
      setShowLogin(true);
      
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Sign Up Failed
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
          Register
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="col py-1 m-1">
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Group className="mb">
            <Form.Label></Form.Label>
            <Form.Control
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="form-control bg-danger bg-opacity-10"
              style={{
                height: "50px",
                borderColor: "#BD0707",
                backgroundColor: "#E0C8C8",
                border: "2px solid #BD0707",
              }}
              type="email"
              placeholder="Email"
              name="email"
              value={form.email}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb">
            <Form.Label></Form.Label>
            <Form.Control
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="form-control bg-danger bg-opacity-10"
              style={{
                height: "50px",
                borderColor: "#BD0707",
                backgroundColor: "#E0C8C8",
                border: "2px solid #BD0707",
              }}
              type="Password"
              placeholder="Password"
              name="password"
              value={form.password}
            />
          </Form.Group>

          <Form.Group className="mb">
            <Form.Label></Form.Label>
            <Form.Control
              onChange={(e) => setForm({ ...form, fullname: e.target.value })}
              className="form-control bg-danger bg-opacity-10"
              style={{
                height: "50px",
                borderColor: "#BD0707",
                backgroundColor: "#E0C8C8",
                border: "2px solid #BD0707",
              }}
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={form.fullname}
            />
          </Form.Group>
          <div className="d-grid gap-2 py-1 my-3">
            <Button
              className="text-white"
              variant="danger"
              size="lg"
              style={{ backgroundColor: "#BD0707" }}
              type="submit"
            >
              Register
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Link
          onClick={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
          style={{ textDecoration: "none", color: "black" }}
        >
          Already have an account ? Click <strong>Here</strong>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default Register;
