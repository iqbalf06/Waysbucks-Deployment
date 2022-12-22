import React from "react";
import { Table, Container, Button, Stack, Row } from "react-bootstrap";
import Approve from "../images/approve.png";
import Cancel from "../images/cancel.png";
import { API } from "../../config/api"
import { useQuery } from "react-query"



function IncomeTransaction() {

  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })
  let { data: trans, refetch } = useQuery("transactionCache", async () => {
    const response = await API.get("/transactions")

    return response.data.data
  })


  return (
    <Container>
      <h1 className="my-5" style={{ fontSize: "24px", color: "#BD0707" }}>
        Income Transaction
      </h1>
      <Table bordered hover>
        <thead style={{ borderColor: "#828282" }}>
          <tr style={{ backgroundColor: "#E5E5E5" }}>
            <th>No</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Income</th>
            <th>Status</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody style={{ borderColor: "#828282" }}>
         {trans?.map((e, index) => {
          return(
          <tr style={{ borderColor: "#828282" }} key={index}>
            <td>{e.id}</td>
            <td>{e.name}</td>
            <td>{e.address}</td>
            <td>{e.phone}</td>
            <td style={{ color: "#061E99" }}>{formatIDR.format(e.total)}</td>
            <td style={{ color: "#FF9900" }}>
                        <p style={{color:"#00d1ff"}}>{e.status}</p>
                      </td>
            <td>
              <Stack
                direction="horizontal"
                gap={3}
                className="justify-content-center"
              >
                  <img
                    className="justify-content-center"
                    src={Approve}
                  />

                
              </Stack>
            </td>
          </tr>
          )
        })}
        
        </tbody>
      </Table>
    </Container>
  );
}

export default IncomeTransaction;
