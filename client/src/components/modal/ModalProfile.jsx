import React, { useState } from "react"
import { Form, Modal, Button } from "react-bootstrap"
import { useMutation } from "react-query"
import { API } from "../../config/api"

const ModalProfile = ({ show, setShow, hide }) => {
  const [form, setForm] = useState({
    fullname: "",
    password: "",
    image: "",
    address: "",
    phone: "",
    poscode:"",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    })
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }

      const formData = new FormData()
      formData.set("fullname", form.fullname)
      formData.set("password", form.password)
      formData.set("image", form.image[0])
      formData.set("address", form.address)
      formData.set("phone", form.phone)
      formData.set("pos_code", form.poscode)


      const res = await API.patch("/user-update", formData, config)
      console.log(res)

      setShow(false)
    } catch (error) {
      console.log(error)
    }
  })
  return (
    <>
      <Modal show={show} onHide={hide} centered>
        <Modal.Body>
          <div className="px-4">
          <p className="fs-4 fw-bold text-center" style={{ color: "#bd0707" }}>
                Update Profile
              </p>
            {/* Handle Error Disini */}
            <Form className="py-3" onSubmit={(e) => handleSubmit.mutate(e)}>
              <Form.Group className="mb-3">
                <div className="border border-danger rounded border-opacity-25">
                  <Form.Control
                    name="fullname"
                    type="text"
                    placeholder="Fullname"
                    onChange={handleChange}
                    style={{
                      borderColor: "#bd0707",
                      borderWidth: "3px",
                      backgroundColor: "#FFF3F7",
                    }}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <div className="border border-danger rounded border-opacity-25">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    style={{
                      borderColor: "#bd0707",
                      borderWidth: "3px",
                      backgroundColor: "#FFF3F7",
                    }}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <div className="border border-danger rounded border-opacity-25">
                  <Form.Control
                    type="file"
                    name="image"
                    id="addProductImage"
                    onChange={handleChange}
                    style={{
                      borderColor: "#bd0707",
                      borderWidth: "3px",
                      backgroundColor: "#FFF3F7",
                    }}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <div className="border border-danger rounded border-opacity-25">
                  <Form.Control
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    onChange={handleChange}
                    style={{
                      borderColor: "#bd0707",
                      borderWidth: "3px",
                      backgroundColor: "#FFF3F7",
                    }}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <div className="border border-danger rounded border-opacity-25">
                  <Form.Control
                    type="text"
                    placeholder="Pos Code"
                    name="poscode"
                    onChange={handleChange}
                    style={{
                      borderColor: "#bd0707",
                      borderWidth: "3px",
                      backgroundColor: "#FFF3F7",
                    }}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <div className="border border-danger rounded border-opacity-25">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Address"
                    name="address"
                    onChange={handleChange}
                    style={{
                      borderColor: "#bd0707",
                      borderWidth: "3px",
                      backgroundColor: "#FFF3F7",
                      resize: "none",
                    }}
                  />
                </div>
              </Form.Group>

              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  type="submit"
                  size="md"
                  style={{
                    width: "100%",
                    color: "white",
                    fontWeight: "bold",
                    borderColor: "#bd0707",
                    backgroundColor: "#bd0707",
                  }}
                >
                  Confirm
                </Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalProfile
