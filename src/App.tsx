import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Store from "./pages/Store/Store";
import { Container } from "./components/common/Container";
import { ShoppingCartProvider, useShoppingCart } from "./context/ShoppingCartContext";

const App = () => {

  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
