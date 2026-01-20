import { useState } from "react";
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { endpoints } from "../services/endpoints";
import { useNavigate, Link } from "react-router-dom";
import {
  Main,
  GridPattern,
  FloatingShape,
  CodeLine,
  Container,
  IconWrapper,
  Title,
  Subtitle,
  Form,
  InputGroup,
  Label,
  Input,
  InputIcon,
  SubmitButton,
  BackLink
} from "../components/styled-components/Auth.styles";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging In");

    try {
      const response = await apiConnector("POST", endpoints.LOGIN_API, formData);

      if (response.data.success) {
        const token = response.data.token;

        localStorage.setItem('token', JSON.stringify(token));
        setIsLoggedIn(true);

        toast.success("Successfully logged in");
        navigate('/');

      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
        navigate('/login');
      }

    } catch (error) {
      console.log("Login Error", error);
      toast.error(`Oops! Server Issue :( \n Lemme fix it in a minute...`);
    }
    finally {
      setFormData({
        username: "",
        password: "",
      });
      toast.dismiss(toastId);
    }
  };

  return (
    <Main>
      <GridPattern />
      <FloatingShape variant={1} />
      <FloatingShape variant={2} />
      <FloatingShape variant={3} />
      
      <CodeLine position={1}>{'const login = async () => {'}</CodeLine>
      <CodeLine position={2}>{'  return await authenticate();'}</CodeLine>
      <CodeLine position={3}>{'if (user.authenticated) {'}</CodeLine>
      <CodeLine position={4}>{'};'}</CodeLine>
      
      <Container>
        <IconWrapper>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </IconWrapper>
        
        <Title>Welcome Back</Title>
        <Subtitle>Enter your credentials to access your account</Subtitle>
        
        <Form onSubmit={submitHandler}>
          <InputGroup>
            <Label>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Username
            </Label>
            <div style={{ position: 'relative' }}>
              <Input 
                name="username" 
                onChange={changeHandler} 
                value={formData.username} 
                type="text" 
                placeholder="Enter username" 
                required
              />
              <InputIcon>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </InputIcon>
            </div>
          </InputGroup>
          
          <InputGroup>
            <Label>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Password
            </Label>
            <div style={{ position: 'relative' }}>
              <Input 
                name="password" 
                onChange={changeHandler} 
                value={formData.password} 
                type="password" 
                placeholder="Enter password" 
                required
              />
              <InputIcon>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </InputIcon>
            </div>
          </InputGroup>
          
          <SubmitButton type="submit">Sign In</SubmitButton>
        </Form>
        
        <BackLink>
          <Link to="/">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </BackLink>
      </Container>
    </Main>
  );
}

export default Login;