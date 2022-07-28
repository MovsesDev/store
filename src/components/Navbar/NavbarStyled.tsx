import styled from "styled-components";
import { NavLink } from "react-router-dom";
export const NavbarS = styled.div`
  padding: 10px 0;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;
export const NavBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Nav = styled.nav`
  /* display: flex; */
  /* height: 100%; */
`;

export const NavItem = styled(NavLink)`
  font-size: 25px;
  font-weight: 500;
  text-decoration: none;
  color: #878787;
  padding: 0 10px;
`;

export const IconWrap = styled.div`
display: flex;
align-items: center;
justify-content: center;
position: relative;
width: 2rem;
cursor: pointer;
`

export const Icon = styled.svg`
height: 100%;
`;

export const Circle = styled.div<{cartQuantity: Number}>`
display: ${props => props.cartQuantity ? 'flex' : 'none'};
justify-content: center;
align-items: center;
width: 18px;
height: 18px;
color: white;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: center;
  font-size: 13px;
  background-color: red;
  transform: translate(15%, 15%);
  border-radius: 50%;
`;

export const LoginButton = styled.button`
  border: 0;
  background: none;
  color: black;
  padding: 4px 8px;
  margin-left: 15px;
  font-size: 20px;
  cursor: pointer;    
`
export const SignUpButton = styled.button`
  border: 0;
  background: none;
  background-color: #1f39cc;
  color: white;
  background-color: black;
  padding: 8px 16px;
  border-radius: 5px;
  margin-left: 15px;
  font-size: 20px;
  cursor: pointer;    
  transition: 0.25s ease;
    &:hover {
  box-shadow: 0 0.2rem 0.2rem -0.2rem var(--hover);
  transform: translateY(-0.12rem);
}

  

`
