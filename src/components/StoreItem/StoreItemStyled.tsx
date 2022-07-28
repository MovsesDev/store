import styled from "styled-components";
export const Card = styled.div`
  margin-top: 10px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  width: 26%;
  padding: 0 0 1rem 0;
  position: relative;
  z-index: 1;
  @media (max-width: 1050px) {
    width: 45%;
  }
  @media (max-width: 700px) {
    width: 100%;
  }
`;
export const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

export const ImageTop = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;

export const ImageName = styled.div``;
export const ImagePrice = styled.div``;
export const ImageMid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
`;
export const Text = styled.span``;
export const Button = styled.button`
  margin: 0 20px;
  background: #306ddf;
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  border: 0;
  cursor: pointer;
`;

export const ImageBottom = styled.div`
  display: flex;
  justify-content: center;
`;
export const AddButton = styled.button`
  background: #306ddf;
  color: white;
  width: 85%;
  padding: 4px 0;
  border-radius: 5px;
  margin: 25px 0 0 0;
  cursor: pointer;
  border: 0;
`;

export const RemoveButton = styled.button`
  background: red;
  color: white;
  padding: 7px 58px;
  border-radius: 5px;
  cursor: pointer;
  border: 0;
`;
