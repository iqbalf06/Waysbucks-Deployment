import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Stack, Card, Image } from "react-bootstrap";
import Fileup from "../images/file.png";
import AddPic from "../images/addproduct.png";
import { API } from "../../config/api"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom";

function AddProduct() {
 
  const [preview, setPreview] = useState(null)

  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
  })

  const handleChange = (e) => {
    setProduct({
      ...product,
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
      formData.set("image", product.image[0])
      formData.set("title", product.title)
      formData.set("price", product.price)

      const response = await API.post("/product", formData)
      console.log("Add Product Successfully", response.data.data)
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
          <Form onSubmit={(e) => handleOnSubmit.mutate(e)} id="addproduct">
            <Form.Group className="mb" controlId="nameProduct">
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
                placeholder="Nama Product"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb" controlId="price">
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
            <Form.Group className="mb" 
            controlId="fileUpload" style={{position:"relative"}}>
              <Form.Label>
                <img
                  src={Fileup}
                  style={{
                    position: "absolute",
                    width: "19px",
                    height: "30px",
                    left: "630px",
                    marginTop: "22px",
                  }}
                ></img>
              </Form.Label>

              <Form.Control
              onChange={handleChange}
              name="image"
                className="form-control bg-danger bg-opacity-10"
                style={{
                  width: "664px",
                  height: "50px",
                  borderColor: "#BD0707",
                  backgroundColor: "#E0C8C8",
                  border: "2px solid #BD0707",
                }}
                type="file"
                size="lg"
                placeholder="Photo Product"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <div style={{ marginTop: "65px", marginLeft: "45px" }}>
              <Button
                className="text-white"
                variant="primary"
                size="lg"
                style={{ backgroundColor: "#BD0707", width: "89%" }}
                type="submit"
              >
                Add Product
              </Button>
            </div>
          </Form>
        </Col>
        <Col>
        <Image
        src={preview}
          style={{
            width: "416px",
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

export default AddProduct;
