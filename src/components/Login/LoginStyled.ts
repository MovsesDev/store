import styled from 'styled-components';

export const Form = styled.form`
padding: 50px 25px;
width: 20%;
background-color: white;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 5px;
@media (max-width: 1500px) {
  width: 35vw;
}
@media (max-width: 1000px) {
  width: 45vw;
}
@media (max-width: 750px) {
  width: 60vw;
}
@media (max-width: 500px) {
  width: 100vw;
  height: 100vh;
}
`;

export const Input = styled.input`
width: 80%;
padding: 8px 4px;
margin: 5px;
border: 2px solid black;
border-radius: 5px;
outline: none;
&:focus {
  border-color: #2e7dd1;
}
`;

export const LoginBtn = styled.button`
background: none;
border: 0;
color: white;
background: black;
padding: 8px 0;
width: 80%;
border-radius: 5px;
margin: 15px;
cursor: pointer;
`;
