import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { UserContext } from './context/userContext'; 

import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navs from "./components/navbar/Navbar";
import DetailProduct from "./pages/DetailProduct";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Transaction from "./components/admin/IncomeTransaction";
import AddProduct from "./components/admin/AddProduct";
import Addtop from "./components/admin/AddToping";
import IncomeTransaction from "./components/admin/IncomeTransaction";
import { API, setAuthToken } from './config/api';
import { useNavigate } from "react-router-dom";

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin == false) {
      navigate('/');
    } else {
      if (state.user.role == 'admin') {
        navigate('/');
      } else if (state.user.role == 'customer') {
        navigate('/');
      }
    }
  }, [state]);
  
  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      console.log("check auth", response)
      
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }
  
      let payload = response.data.data;
      payload.token = localStorage.token;
  
      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    checkUser();
  }, []);


  return (
    <>
          <Navs />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-cart" element={<Cart />} />
          <Route path="/products/:id" element={<DetailProduct />} />
          <Route path="/income" element={<IncomeTransaction />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/add-toping" element={<Addtop />} />
          <Route path="/transaction" element={<Transaction />} />
        </Routes>
    </>
  );
}

export default App;
