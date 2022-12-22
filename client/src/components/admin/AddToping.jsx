import React, { useState } from "react"

import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import Fileup from "../images/file.png";
import { API } from "../../config/api"
import { useMutation } from "react-query"

function AddToping() {
  const [preview, setPreview] = useState(null)

  const [topping, setTopping] = useState({
    title: "",
    price: "",
    image: "",
    // qty: "",
  })

  const handleChange = (e) => {
    setTopping({
      ...topping,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    })

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
    }
  }

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const formData = new FormData()
      formData.set("image", topping.image[0])
      formData.set("title", topping.title)
      formData.set("price", topping.price)

      const response = await API.post("/topping", formData)
      console.log("Add Topping Successfully", response.data.data)
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <Container>
      <Row>
        <Col style={{ marginTop: "7%" }}>
          <h1 className="my-5" style={{ fontSize: "24px", color: "#BD0707" }}>
            Product
          </h1>
          <Form onSubmit={(e) => handleOnSubmit.mutate(e)} id="addtopping">
            <Form.Group className="mb">
              <Form.Label></Form.Label>
              <Form.Control
              onChange={handleChange}
              name="title"
                className="form-control bg-danger bg-opacity-10"
                style={{
                  width: "664px",
                  height: "50px",
                  borderColor: "#BD0707",
                  backgroundColor: "#E0C8C8",
                  border: "2px solid #BD0707",
                }}
                type="text"
                placeholder="Nama Topping"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb">
              <Form.Label></Form.Label>
              <Form.Control
              onChange={handleChange}
              name="price"
                className="form-control bg-danger bg-opacity-10"
                style={{
                  width: "664px",
                  height: "50px",
                  borderColor: "#BD0707",
                  backgroundColor: "#E0C8C8",
                  border: "2px solid #BD0707",
                }}
                type="number"
                placeholder="Price"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb">
              <Form.Label>
                <img
                  src={Fileup}
                  style={{
                    position: "absolute",
                    width: "19px",
                    height: "30px",
                    left: "750px",
                    marginTop: "22px",
                  }}
                ></img>
              </Form.Label>

              <Form.Control
                className="form-control bg-danger bg-opacity-10"
                onChange={handleChange}
                name="image"
                style={{
                  width: "664px",
                  height: "50px",
                  borderColor: "#BD0707",
                  backgroundColor: "#E0C8C8",
                  border: "2px solid #BD0707",
                }}
                type="file"
                size="lg"
                placeholder="Photo Topping"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <div style={{ marginTop: "65px", marginLeft: "45px" }}>
              <Button
                className="text-white"
                variant="primary"
                size="lg"
                type="submit"
                style={{ backgroundColor: "#BD0707", width: "89%" }}
              >
                Add Topping
              </Button>
            </div>
          </Form>
        </Col>
        <Col>
        <Image
        src={preview}
          style={{
            width: "406px",
            marginLeft: "20%",
            marginTop: "25%",
            marginRight: "4%",
          }}
          />
          
          </Col>
      </Row>
    </Container>
  );
}

export default AddToping;
