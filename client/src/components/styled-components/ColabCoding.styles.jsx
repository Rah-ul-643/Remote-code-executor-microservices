import styled from "styled-components";

export const GroupChatContainer = styled.div`
  box-sizing: border-box;
  background-color: #181414;
  height:90%;
  width: 95%;
  border-radius: 10px; 
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: #ffffff;
  font-family: 'Urbanist', serif;
`;

export const IntroText = styled.h2`
    color: green;
    font-size: 1.4rem;
    font-family: "Orbitron";
`

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #282424;
  padding: 20px;
  border-radius: 10px;
  width: 40%;
`;

export const ContainerHeading = styled.h2`

`

export const RoomButton = styled.button`
  background-image: linear-gradient(to right, #d848f5, #8800ff);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
  font-family: "Orbitron";  
`;


export const RoomIdText = styled.p`
  font-size: 1.2rem;
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  color: #d848f5;
  font-family: 'Montaga', serif;
`;


export const InputField = styled.input`
  padding: 10px;
  width: 80%;
  border-radius: 5px;
  outline: none;
  background-color: white;
  color: black;
  font-size: 1rem;
  margin-top: 20px;
`;