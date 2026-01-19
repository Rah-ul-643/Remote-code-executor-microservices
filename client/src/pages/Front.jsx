import  { useEffect } from "react";
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { endpoints } from "../services/endpoints";

import { Container, Nav, InfoContainer, Title, Desc, ButtonContainer } from "../components/styled-components/Front.styles";

const Front = ({ setIsLoggedIn }) => {

  const token = window.localStorage.getItem("token");
  
  useEffect(() => {

    const validate = async () => {
      try {
        await apiConnector("GET", endpoints.VALIDATE_API)
          .catch(error => {
            console.error("apiConnector failed:", error);
            throw error;
          });
      }
      catch (error) {
        console.log("TOKEN VALIDATION API FALIED ", error);
        window.localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    }

    validate();

  }, [setIsLoggedIn]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success('Logged out successfully!');
  }

  return (
    <Container>
      <Nav>
        {!token &&
          <div>
            <Link to='/login'><ButtonContainer>Login</ButtonContainer></Link>
            <Link to='/register'><ButtonContainer>Register</ButtonContainer></Link>
          </div>
        }
        {
          token &&
          <div>
            <ButtonContainer onClick={logoutHandler}>Logout</ButtonContainer>
          </div>

        }

      </Nav>


      <InfoContainer>
        <Title>Cipher Flow</Title>
        <Desc>Master Algorithms, Unleash Creativity: Begin Your Coding Odyssey Here</Desc>
        <Link to='/editor'> <ButtonContainer>Start Now</ButtonContainer></Link>
      </InfoContainer>
    </Container>
  );
};

export default Front;
