import styled, { keyframes } from "styled-components";

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Main container
export const Main = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
              linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
`;

// Background grid
export const GridPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
`;

// Floating shapes
export const FloatingShape1 = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(16, 185, 129, 0.1);
  top: 10%;
  left: 10%;
  border-radius: 50%;
  filter: blur(60px);
  animation: ${float} 8s ease-in-out infinite;
  pointer-events: none;
`;

export const FloatingShape2 = styled.div`
  position: absolute;
  width: 250px;
  height: 250px;
  background: rgba(59, 130, 246, 0.08);
  bottom: 15%;
  right: 15%;
  border-radius: 50%;
  filter: blur(60px);
  animation: ${float} 8s ease-in-out infinite;
  animation-delay: 2s;
  pointer-events: none;
`;

export const FloatingShape3 = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  background: rgba(139, 92, 246, 0.06);
  top: 50%;
  right: 20%;
  border-radius: 50%;
  filter: blur(60px);
  animation: ${float} 8s ease-in-out infinite;
  animation-delay: 4s;
  pointer-events: none;
`;

// Form container
export const Container = styled.div`
  background: linear-gradient(135deg, rgba(25, 25, 25, 0.98) 0%, rgba(20, 20, 20, 0.95) 100%);
  border: 1px solid rgba(16, 185, 129, 0.2);
  width: 100%;
  max-width: 420px;
  padding: 40px 36px;
  border-radius: 20px;
  box-shadow: 
    0 0 0 1px rgba(16, 185, 129, 0.1),
    0 20px 60px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  z-index: 10;
  position: relative;
  overflow: hidden;
  animation: ${slideIn} 0.5s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(16, 185, 129, 0.8), 
      rgba(59, 130, 246, 0.6),
      transparent
    );
  }

  @media (max-width: 480px) {
    padding: 36px 28px;
  }
`;

// Icon at top
export const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  margin: 0 auto 20px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%);
  border: 1px solid rgba(16, 185, 129, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 28px;
    height: 28px;
    color: rgb(16, 185, 129);
    filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.4));
  }
`;

// Title
export const Title = styled.h1`
  font-size: 1.85rem;
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 6px;
  text-align: center;
  letter-spacing: -0.01em;

  @media (max-width: 480px) {
    font-size: 1.65rem;
  }
`;

// Subtitle
export const Subtitle = styled.p`
  color: rgb(156, 163, 175);
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 28px;
`;

// Form
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// Input wrapper
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

// Label
export const Label = styled.label`
  color: rgb(209, 213, 219);
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    width: 14px;
    height: 14px;
    color: rgba(16, 185, 129, 0.6);
  }
`;

// Input field
export const Input = styled.input`
  font-size: 0.95rem;
  padding: 11px 14px 11px 38px;
  background-color: rgb(30, 30, 30);
  border: 1px solid rgb(60, 60, 60);
  border-radius: 10px;
  color: #ffffff;
  transition: all 0.2s ease;

  &::placeholder {
    color: rgb(100, 100, 100);
  }

  &:focus {
    outline: none;
    background-color: rgb(35, 35, 35);
    border-color: rgb(16, 185, 129);
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.08);
  }

  &:hover:not(:focus) {
    border-color: rgb(80, 80, 80);
  }
`;

// Input icon wrapper
export const InputIconWrapper = styled.div`
  position: relative;
`;

// Icon inside input
export const InputIcon = styled.div`
  position: absolute;
  left: 12px;
  bottom: 12px;
  color: rgb(100, 100, 100);
  pointer-events: none;
  transition: color 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  ${Input}:focus ~ & {
    color: rgb(16, 185, 129);
  }
`;

// Submit button
export const SubmitButton = styled.button`
  margin-top: 6px;
  cursor: pointer;
  background: linear-gradient(135deg, rgb(16, 185, 129) 0%, rgb(5, 150, 105) 100%);
  color: #000000;
  padding: 12px 24px;
  transition: all 0.2s ease;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Back link
export const BackLink = styled.div`
  margin-top: 20px;
  text-align: center;
  
  a {
    color: rgb(16, 185, 129);
    text-decoration: none;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;

    svg {
      width: 16px;
      height: 16px;
    }

    &:hover {
      color: rgb(5, 150, 105);
    }
  }
`;