import styled, { keyframes } from "styled-components";

const float = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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

export const GridPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(circle at center, black 0%, transparent 70%);
  -webkit-mask-image: radial-gradient(circle at center, black 0%, transparent 70%);
`;

export const FloatingShape = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  animation: ${float} 8s ease-in-out infinite;
  pointer-events: none;
  
  ${props => props.variant === 1 && `
    width: 300px;
    height: 300px;
    background: rgba(16, 185, 129, 0.1);
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  `}
  
  ${props => props.variant === 2 && `
    width: 250px;
    height: 250px;
    background: rgba(59, 130, 246, 0.08);
    bottom: 15%;
    right: 15%;
    animation-delay: 2s;
  `}
  
  ${props => props.variant === 3 && `
    width: 200px;
    height: 200px;
    background: rgba(139, 92, 246, 0.06);
    top: 50%;
    right: 20%;
    animation-delay: 4s;
  `}
`;

export const CodeLine = styled.div`
  position: absolute;
  font-family: 'Courier New', monospace;
  color: rgba(16, 185, 129, 0.15);
  font-size: 0.75rem;
  white-space: nowrap;
  animation: ${pulse} 4s ease-in-out infinite;
  pointer-events: none;
  
  ${props => props.position === 1 && `
    top: 15%;
    left: 5%;
    animation-delay: 0s;
  `}
  
  ${props => props.position === 2 && `
    top: 70%;
    left: 8%;
    animation-delay: 1.5s;
  `}
  
  ${props => props.position === 3 && `
    top: 25%;
    right: 8%;
    animation-delay: 3s;
  `}
  
  ${props => props.position === 4 && `
    bottom: 20%;
    right: 5%;
    animation-delay: 2s;
  `}
`;

export const Container = styled.div`
  background: linear-gradient(135deg, rgba(25, 25, 25, 0.98) 0%, rgba(20, 20, 20, 0.95) 100%);
  border: 1px solid rgba(16, 185, 129, 0.2);
  width: 100%;
  max-width: 420px;
  padding: 40px 36px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
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

  &::after {
    content: '';
    position: absolute;
    bottom: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.03) 0%, transparent 70%);
    pointer-events: none;
  }

  @media (max-width: 480px) {
    padding: 36px 28px;
    max-width: 100%;
  }
`;

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
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 17px;
    padding: 2px;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(59, 130, 246, 0.3));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.5;
  }

  svg {
    width: 28px;
    height: 28px;
    color: rgba(16, 185, 129, 1);
    filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.4));
  }
`;

export const Title = styled.h1`
  font-size: 1.85rem;
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 6px;
  text-align: center;
  letter-spacing: -0.01em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  @media (max-width: 480px) {
    font-size: 1.65rem;
  }
`;

export const Subtitle = styled.p`
  color: rgba(156, 163, 175, 1);
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 28px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

export const Label = styled.label`
  color: rgba(209, 213, 219, 1);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    width: 14px;
    height: 14px;
    color: rgba(16, 185, 129, 0.6);
  }
`;

export const Input = styled.input`
  font-size: 0.95rem;
  padding: 11px 14px 11px 38px;
  background-color: rgba(30, 30, 30, 1);
  border: 1px solid rgba(60, 60, 60, 1);
  border-radius: 10px;
  color: #ffffff;
  transition: all 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  &::placeholder {
    color: rgba(100, 100, 100, 1);
  }

  &:focus {
    outline: none;
    background-color: rgba(35, 35, 35, 1);
    border-color: rgba(16, 185, 129, 1);
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.08);
  }

  &:hover:not(:focus) {
    border-color: rgba(80, 80, 80, 1);
  }
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 12px;
  bottom: 12px;
  color: rgba(100, 100, 100, 1);
  pointer-events: none;
  transition: color 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  ${Input}:focus ~ & {
    color: rgba(16, 185, 129, 1);
  }
`;

export const SubmitButton = styled.button`
  margin-top: 6px;
  cursor: pointer;
  background: linear-gradient(135deg, rgba(16, 185, 129, 1) 0%, rgba(5, 150, 105, 1) 100%);
  color: #000000;
  padding: 12px 24px;
  transition: all 0.2s ease;
  border: none;
  border-radius: 10px;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:hover::before {
    width: 300px;
    height: 300px;
  }

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

export const BackLink = styled.div`
  margin-top: 20px;
  text-align: center;
  
  a {
    color: rgba(16, 185, 129, 1);
    text-decoration: none;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    display: inline-flex;
    align-items: center;
    gap: 6px;

    &:hover {
      color: rgba(5, 150, 105, 1);
      gap: 8px;
    }
  }
`;

export const Divider = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(100, 100, 100, 1);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(60, 60, 60, 1), transparent);
  }
`;