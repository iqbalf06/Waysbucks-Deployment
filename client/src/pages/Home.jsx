import React from "react";
import hero from "../components/images/Frame 1.png";
import Product from "./Product"
import Navbar from "../components/navbar/Navbar"


const Home = () => {
  return (
    <>
    <div style={{ marginTop: "7%" }}>
      <div className="px-5 pt-5 position-relative">
        <img className="img-fluid" src={hero} />
        <div
          className="position-absolute top-0 start-0 px-5"
          style={{ width: 800, marginLeft: "5%", marginTop: "10%" }}
        >
          <p className="h1 fw-bold text-white" style={{ fontSize: "60px" }}>
            WAYSBUCKS
          </p>
          <p
            className="text-white"
            style={{ fontSize: "24px", paddingTop: "3%" }}
          >
            Things are changing, but we’re still here for you
          </p>
          <p
            className="text-white"
            style={{
              fontSize: "18px",
              width: 500,
              paddingTop: "3%",
              marginBottom: "1px",
            }}
          >
            We have temporarily closed our in-store cafes, but select grocery
            and drive-thru locations remaining open.
          </p>
          <p className="text-white" style={{ fontSize: "18px", width: 500 }}>
            <strong>Waysbucks</strong> Drivers is also available
          </p>

          <p
            className="text-white"
            style={{ fontSize: "24px", marginTop: "10%" }}
          >
            Let's Order ...
          </p>
        </div>
      </div>
      <p
        className="fw-bold"
        style={{
          color: "#BD0707",
          fontSize: "36px",
          marginLeft: "4%",
          marginTop: "3%",
        }}
      >
        Let's Order
      </p>
      <Product />
    </div>
    </>
  );
};

export default Home;