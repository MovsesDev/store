import React, { SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

  const BackGround = styled.div<{logout: boolean}>`
      position: absolute;
      z-index: 1000;
      top: ${(props) => (props.logout ? "0" : "-100%")};
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0,0,0,0.4);
      display: flex;
      justify-content: center;
      align-items: center;
  `
  const Button = styled.button`
      cursor: pointer;
      color: red;
      padding: 8px 16px;
      text-align: center;
      background-color: white;
      border-radius: 4px;
  `

const Logout: React.FC<{logout: boolean, setLogout: React.Dispatch<SetStateAction<boolean>>}> = ({logout, setLogout}) => {
    const navigate = useNavigate()
  return (
    <BackGround logout={logout}>
        <Button onClick={() => {localStorage.removeItem("user"); navigate("/sign");setLogout(false)}}>Log out</Button>
    </BackGround>
  )
}




export default Logout