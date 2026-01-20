import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { endpoints } from "../services/endpoints";
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

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    password2: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (formData.password === formData.password2) {
      const toastId = toast.loading('Registering User...');

      try {
        const response = await apiConnector("POST", endpoints.SIGNUP_API, formData);

        console.log(response.data);

        if (response.data.success) {
          toast.success(response.data.message);
          navigate('/login');
        } else {
          toast.error(response.data.message);
        }

      } catch (error) {
        console.log("signup Error", error);
        toast.error(`Oops! Server Issue :( \n Lemme fix it in a minute...`);
      }
      finally {
        setFormData({
          name: "",
          username: "",
          password: "",
          password2: "",
        });
        toast.dismiss(toastId);
      }
    } else {
      toast.error("Password does not match");
    }
  };

  return (
    <Main>
      <GridPattern />
      <FloatingShape variant={1} />
      <FloatingShape variant={2} />
      <FloatingShape variant={3} />
      
      <CodeLine position={1}>{'const register = (user) => {'}</CodeLine>
      <CodeLine position={2}>{'  await createAccount(user);'}</CodeLine>
      <CodeLine position={3}>{'return { success: true };'}</CodeLine>
      <CodeLine position={4}>{'};'}</CodeLine>
      
      <Container>
        <IconWrapper>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </IconWrapper>
        
        <Title>Create Account</Title>
        <Subtitle>Join us and start your coding journey</Subtitle>
        
        <Form onSubmit={submitHandler}>
          <InputGroup>
            <Label>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Name
            </Label>
            <div style={{ position: 'relative' }}>
              <Input 
                name="name" 
                onChange={changeHandler} 
                value={formData.name} 
                placeholder="Enter your name" 
                type="text"
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Username
            </Label>
            <div style={{ position: 'relative' }}>
              <Input 
                name="username" 
                onChange={changeHandler} 
                value={formData.username} 
                type="text" 
                placeholder="Choose a username"
                required
              />
              <InputIcon>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                placeholder="Create password"
                required
              />
              <InputIcon>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </InputIcon>
            </div>
          </InputGroup>

          <InputGroup>
            <Label>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Confirm Password
            </Label>
            <div style={{ position: 'relative' }}>
              <Input 
                name="password2" 
                onChange={changeHandler} 
                value={formData.password2} 
                type="password" 
                placeholder="Confirm password"
                required
              />
              <InputIcon>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </InputIcon>
            </div>
          </InputGroup>
          
          <SubmitButton type="submit">Create Account</SubmitButton>
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