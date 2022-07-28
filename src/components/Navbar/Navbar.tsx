import { useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTHOR } from "../../apollo/requests";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import useOnClickOutside from "../../hooks/outsikdeClick";
import Basket from "../Basket/Basket";
import { Container } from "../common/Container";
import Login from "../Login/Login";
import Modal from "../common/Modal";
import {
  Circle,
  Icon,
  IconWrap,
  LoginButton,
  Nav,
  NavbarS,
  NavBody,
  NavItem,
  SignUpButton,
} from "./NavbarStyled";
import SignUp from "../SignUp/SignUp";
import Logout from "../Logout";
const Navbar = () => {
  const { data } = useQuery(AUTHOR, {
    variables: {
      email: localStorage.getItem("user"),
    },
    skip: localStorage.getItem("user") === null,
  });
  const quantity = data?.authors[0].itemInfo?.map(
    (i: { quantity: number }) => i.quantity
  );

  let cartQuantity = quantity?.reduce(
    (previousValue: number, currentValue: number) =>
      previousValue + currentValue,
    0
  );
  const { setBasketOpen, isAuth, setIsAuth } = useShoppingCart();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [location, setLocation] = useState<boolean>(false);
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [navigate]);

  return (
    <NavbarS>
      <Container>
        <NavBody>
          <Nav>
            <NavItem to="/">Home</NavItem>
            <NavItem to="/store">Store</NavItem>
            <NavItem to="/about">About</NavItem>
          </Nav>
          <div style={{ display: "flex" }}>
            <IconWrap onClick={() => setBasketOpen(true)}>
              <Icon
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="256"
                height="256"
                viewBox="0 0 256 256"
              >
                <desc>Created with Fabric.js 1.7.22</desc>
                <defs></defs>
                <g transform="translate(128 128) scale(0.72 0.72)">
                  <g transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)">
                    <path
                      d="M 72.975 58.994 H 31.855 c -1.539 0 -2.897 -1.005 -3.347 -2.477 L 15.199 13.006 H 3.5 c -1.933 0 -3.5 -1.567 -3.5 -3.5 s 1.567 -3.5 3.5 -3.5 h 14.289 c 1.539 0 2.897 1.005 3.347 2.476 l 13.309 43.512 h 36.204 l 10.585 -25.191 H 45 c -1.933 0 -3.5 -1.567 -3.5 -3.5 s 1.567 -3.5 3.5 -3.5 h 41.5 c 1.172 0 2.267 0.587 2.915 1.563 s 0.766 2.212 0.312 3.293 L 76.201 56.85 C 75.655 58.149 74.384 58.994 72.975 58.994 z"
                      transform=" matrix(1 0 0 1 0 0) "
                      strokeLinecap="round"
                    />
                    <circle
                      cx="28.88"
                      cy="74.33"
                      r="6.16"
                      transform="  matrix(1 0 0 1 0 0) "
                    />
                    <circle
                      cx="74.59"
                      cy="74.33"
                      r="6.16"
                      transform="  matrix(1 0 0 1 0 0) "
                    />
                  </g>
                </g>
              </Icon>

              <Circle cartQuantity={cartQuantity}>{cartQuantity}</Circle>
            </IconWrap>
            <div style={{ marginLeft: "30px" }}>
              {isAuth ? (
                <SignUpButton
                  onClick={() => {
                    setLogout(true);
                  }}
                >
                  Log out
                </SignUpButton>
              ) : (
                <>
                  <LoginButton
                    onClick={() => {
                      setIsOpen(true);
                      setLocation(true);
                    }}
                  >
                    Log in
                  </LoginButton>
                  <SignUpButton
                    onClick={() => {
                      setIsOpen(true);
                      setLocation(false);
                    }}
                  >
                    Sign up
                  </SignUpButton>
                </>
              )}
            </div>
          </div>
        </NavBody>
      </Container>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {location ? (
          <Login setLocation={setLocation} setIsOpen={setIsOpen} />
        ) : (
          <SignUp setLocation={setLocation} setIsOpen={setIsOpen} />
        )}{" "}
      </Modal>
      <Logout logout={logout} setLogout={setLogout}/>
    </NavbarS>
  );
};

export default Navbar;
