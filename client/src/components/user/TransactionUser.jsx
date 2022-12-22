import React from "react"
import { Stack, Image } from "react-bootstrap"
import { API } from "../../config/api"
import { useQuery } from "react-query"
import Group from "../images/Group.png"
import Barcode from "../images/qr-code.png"

const TransactionUser = () => {
  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })

  let { data: transactionUser, refetch } = useQuery("transactionUserCache", async () => {
    const response = await API.get("/transaction-user")

    return response.data.data
  })

  console.log("ini data transUser", transactionUser)
  return (
    <>
      {transactionUser?.map((item, index) => (
        <div
          className="p-4 rounded-3 mb-3"
          style={{ backgroundColor: "#F7DADA" }}
        >
          <div key={index} className="d-flex justify-content-between my-2">
            <div>
              {item?.order?.map((order, idx) => (
                <div className="my-2 d-flex" key={idx}>
                  <div className="me-3 ">
                    <img
                      src={order?.product.image}
                      alt={order?.product.image}
                      width={80}
                    />
                  </div>
                  <div style={{ color: "#BD0707" }}>
                    <div className="mb-2">
                      <label className="fw-bold" style={{ fontSize: "14px" }}>
                        {order?.product.title}
                      </label>
                      <br />
                      <label style={{ fontSize: "10px" }}>
                        <span className="fw-bold">Saturday</span> 5, Desember 2022
                      </label>
                      <br />
                    </div>
                    <div>
                      <label
                        className="fw-bold"
                        style={{ color: "#613D2B", fontSize: "10px" }}
                      >
                        Toping :
                        {order?.topping?.map((topping, idx) => (
                          <span
                            style={{ fontSize: "10px", color: "#BD0707" }}
                            key={idx}
                          >
                            {" "}
                            {topping?.title},
                          </span>
                        ))}
                      </label>
                      <br />
                      <label style={{ color: "#613D2B", fontSize: "10px" }}>
                        Price : {formatIDR.format(order?.sub_total)}
                      </label>
                      <br />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div align="center">
              <div>
                <img src={Group} width={50} alt="" />
              </div>
              <div className="mt-3" align="center">
                <img src={Barcode} width={50} alt="" />
              </div>
              <div
                className="mt-3 px-4 py-1 rounded-3"
                style={{ backgroundColor: "#CCF6FF" }}
              >
                <label style={{ color: "#00D1FF" }}>{item?.status}</label>
              </div>
              <div className="mt-3" style={{ color: "#613D2B" }}>
                <p className="fw-bold">
                  Sub total : {formatIDR.format(item?.total)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default TransactionUser