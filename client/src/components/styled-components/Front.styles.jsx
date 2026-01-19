import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: relative;
  flex-direction: column;
  background-image: url("../matrix.gif");
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat;
`;

export const Nav = styled.div`
  display:flex;
  justify-content:space-between;
  gap:50px;
  right:50px;
  top:10px;
  height:100px;
  position:absolute;
  z-index:1;
`;


export const InfoContainer = styled.div`
  flex: 1;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 40;
  background-color: transparent; /* Set the background color to transparent */
`;

export const Title = styled.h1`
  font-size: 100px;
  font-family: 'Urbanist', serif;
  color: white;
  font-weight: 800;
  margin-bottom:10px;
`;

export const Desc = styled.p`
  margin: 50px 0px;
  font-family: 'Montaga', serif;
  font-size: 25px;
  letter-spacing: 3px;
  font-weight: lighter;
  color: white;
  word-spacing: 6px;
  margin-top: 0;
`;


export const ButtonContainer = styled.button`
  border-radius:30px;
  font-size: 1.1rem;  
  font-family: 'serif';
  width:150px;
  padding:10px;
  border:1px solid white;
  margin: 0.5rem;
  background-color: black;
  box-shadow: 0 0 10px rgba(255, 0, 255, 0.5), 
              0 0 20px rgba(0, 255, 255, 0.5), 
              0 0 30px rgba(255, 0, 255, 0.7); /* Neon glow effect */
  color:white;
  text-decoration:none;
  cursor:pointer;
  z-index:2;
  transition: transform 0.3s ease;

  &:hover {
    box-shadow: 0 0 10px rgba(255, 0, 255, 0.8), 
              0 0 20px rgba(0, 255, 255, 0.9), 
              0 0 30px rgba(255, 0, 255, 0.8); 
    transform: scale(1.05);
  }

`;