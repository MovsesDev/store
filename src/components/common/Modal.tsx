import React, { Dispatch, ReactNode, SetStateAction, useRef } from "react";
import styled from "styled-components";

export const ModalS = styled.div<{isOpen: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
    display:${props => props.isOpen ? 'flex' : 'none'};
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
  transition: transform .7s ease;
  z-index: 1000;
`;

const CloseBtn = styled.button`
    background: none;
    border: 0;
    font-size: 28px;
    color: white;
    position: absolute;
    top: 0;
    right: 0;
z-index: 1000;
    transform: translate(-45%, 25%);
    cursor: pointer;
`

interface ModalProps {
    children: ReactNode,
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, setIsOpen }) => {


  return <ModalS isOpen={isOpen}>{children} <CloseBtn onClick={() => setIsOpen(false)}>X</CloseBtn></ModalS>;
};

export default Modal;
