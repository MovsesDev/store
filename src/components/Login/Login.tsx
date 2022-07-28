import { useQuery } from "@apollo/client";
import { type } from "os";
import React, { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LOGIN_AUTHOR } from "../../apollo/requests";
import useOnClickOutside from "../../hooks/outsikdeClick";
import { Form, Input, LoginBtn } from "./LoginStyled";
interface SignUpProps {
  setLocation: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Login: React.FC<SignUpProps> = ({ setLocation, setIsOpen }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate()
  const {error, loading, data} = useQuery(LOGIN_AUTHOR, {variables: {
    email, password
  }})
  
  
  
  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.setItem('user', data.authors[0].email)
    navigate('/signl')
    setIsOpen(false)
  };

  const squareBoxRef = useRef<HTMLFormElement>(null);
  useOnClickOutside(squareBoxRef, () => setIsOpen(false));
  return (
    <Form ref={squareBoxRef}>
      Sign in
      <Input value={email}
        onChange={(e) => setEmail(e.target.value)} placeholder="Email" type='email'></Input>
      <Input  value={password }
        onChange={(e) => setPassword(e.target.value)} placeholder="Password" type='password'></Input>
      <LoginBtn onClick={handleLogin}>Log in</LoginBtn>
      <p>
        Dont have an account?{" "}
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "17px",
          }}
          onClick={() => setLocation(false)}
        >
          Sign up
        </button>
      </p>
    </Form>
  );
};

export default Login;
