import styled from "styled-components";

export const BasketS = styled.div`
  position: relative;
`;

export const BackGround = styled.div<{ active: Boolean }>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: ${(props) => (props.active === true ? "0" : "-100%")};
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

export const Modal = styled.div<{ active: Boolean }>`
  position: absolute;
  top: 0;
  right: ${(props) => (props.active === true ? "0" : "-100%")};
  height: 100vh;
  width: 30vw;
  z-index: 10;
  background-color: white;
  transition: 0.65s all;
  @media (max-width: 1100px) {
        width: 45vw;
  }
      @media (max-width: 750px) {
        width: 60vw;
  }
      @media (max-width: 500px) {
        width: 100vw;
  }
  `;

export const CloseBtn = styled.button<{ active: Boolean }>`
  position: absolute;
  top: 0;
  right: ${(props) => (props.active === true ? "0" : "-100%")};
  background: none;
  border: 0;
  outline: none;
  font-size: 30px;
  z-index: 11;
  color: black;
  cursor: pointer;
  transform: translate(-25%, 0%);
`;
