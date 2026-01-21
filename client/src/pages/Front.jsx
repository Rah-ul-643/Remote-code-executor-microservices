import { useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { endpoints } from "../services/endpoints";

import { Container, Nav, InfoContainer, Title, Desc, ButtonContainer, Canvas, GradientOverlay, Divider, AmbientOrb } from "../components/styled-components/Front.styles";

const Front = ({ setIsLoggedIn }) => {
  const canvasRef = useRef(null);
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
        console.log("TOKEN VALIDATION API FAILED ", error);
        window.localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    }

    validate();
  }, [setIsLoggedIn]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success('Logged out successfully!');
  }

  return (
    <Container>
      <Canvas ref={canvasRef} />
      <GradientOverlay />
      
      <AmbientOrb style={{ top: '25%', left: '25%' }} />
      <AmbientOrb style={{ bottom: '25%', right: '25%' }} />

      <Nav>
        {!token && (
          <div>
            <Link to='/login'><ButtonContainer>Login</ButtonContainer></Link>
            <Link to='/register'><ButtonContainer>Register</ButtonContainer></Link>
          </div>
        )}
        {token && (
          <div>
            <ButtonContainer onClick={logoutHandler}>Logout</ButtonContainer>
          </div>
        )}
      </Nav>

      <InfoContainer>
        <Title>Cipher Flow</Title>
        <Divider />
        <Desc>Master Algorithms, Unleash Creativity: Begin Your Coding Odyssey Here</Desc>
        <Link to='/editor'>
          <ButtonContainer>Code now</ButtonContainer>
        </Link>
      </InfoContainer>
    </Container>
  );
};

export default Front;