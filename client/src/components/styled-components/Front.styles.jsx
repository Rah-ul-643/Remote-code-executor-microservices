import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: relative;
  flex-direction: column;
  background-color: #000000;
  overflow: hidden;
`;

export const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  opacity: 0.2;
`;

export const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8));
  pointer-events: none;
`;

export const AmbientOrb = styled.div`
  position: absolute;
  width: 384px;
  height: 384px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.05), transparent);
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
`;

export const Nav = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  position: absolute;
  right: 32px;
  top: 32px;
  z-index: 20;

  div {
    display: flex;
    gap: 12px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 10;
  max-width: 56rem;
  padding: 0 1rem;
`;

export const Title = styled.h1`
  font-size: clamp(3rem, 8vw, 7rem);
  font-family: 'Urbanist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.1;
`;

export const Divider = styled.div`
  height: 1px;
  width: 8rem;
  background: linear-gradient(to right, transparent, rgba(16, 185, 129, 1), transparent);
  margin: 0 auto 2rem;
`;

export const Desc = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-family: 'Montaga', Georgia, serif;
  color: #d1d5db;
  font-weight: 300;
  letter-spacing: 0.05em;
  line-height: 1.75;
  max-width: 48rem;
  margin: 0 auto 2rem;
`;

export const ButtonContainer = styled.button`
  position: relative;
  border-radius: 9999px;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 500;
  padding: 12px 32px;
  border: 2px solid rgba(16, 185, 129, 1);
  background-color: transparent;
  color: rgba(16, 185, 129, 1);
  text-decoration: none;
  cursor: pointer;
  z-index: 2;
  letter-spacing: 0.05em;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(16, 185, 129, 1);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
    z-index: -1;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  &:hover {
    color: #000000;
    border-color: rgba(16, 185, 129, 1);
  }

  &:active {
    transform: scale(0.98);
  }
`;
