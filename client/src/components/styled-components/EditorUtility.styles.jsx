import styled from "styled-components";
import { mobile } from "../../responsive";


export const MainControl = styled.div`
  flex: 0.1;
  box-sizing: border-box;
  display: flex;
  background-color: #282424;
  padding-left: 100px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 100%;
  border-top: green solid 2px;
  ${mobile({ gap: "15%" })};
`;

export const MainControlSec = styled.div`
  font-family: Orbitron;
  flex: 0.5;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
`;

export const MainControlButton = styled.button`
  height: 50%;
  width: 50%;
  color: white;
  background-color: transparent;
  font-family: inherit;
  border: none;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  ${mobile({ fontSize: "10px" })};
  &:hover {
    background-color: #884BB5;
  }
`;

export const MainControlInput = styled.input`
  
`;

export const MainControlModel = styled.p`
  color: #11ACAC;
`;

export const Button = styled.button`
  font-family: inherit;
  font-size: 1rem;
  padding: 10px;
  width: 60%;
  background-color: transparent;
  color: white;
  font-weight: bold;
  border-radius: 10px;

  border: none;
  ${mobile({ width: "50%" })};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover{
    background-color: green;
  }
`;

export const CustomSelect = styled.select`
  background-color: black;
  border: none;
  text-decoration: none;
  color: white;
  font-family: Orbitron;
  ${mobile({ fontSize: "10px" })};
`;
