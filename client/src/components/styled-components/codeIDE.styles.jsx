import styled from "styled-components";
import { mobile } from "../../responsive";


export const Main = styled.div`
  color: white;
  display: flex;
  height: 100vh;
  margin-right: 1vw;
  width: 100vw;
  background-color: #21222d;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 20px;
  gap: 20px;
`;

/* Layout styled components grouped and kept concise */
export const MainLeftSec = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 60%;
  border-radius: 20px;
  background-color: #171821;
  gap: 10px;
  align-items: center;
  text-align: center;
`;

export const ModalButton = styled.button`
  font-family: "Montaga", serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 25%;
  border-radius: 10px;
  background-color: ${(p) => (p.isselected ? "#f1f1f1" : "#21222D")};
  ${mobile({ width: "100%" })};
  border: solid green 2px;
  cursor: pointer;
  margin-right: 30px;
  color: green;
  font-size: 1.2rem;
`;

export const TextIOContainer = styled.div`
  display: flex;
  background-color: transparent;
  flex: 3;
  width: 95%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index:0;
`;

export const FilesListControl = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  justify-content: left;
  align-items: center;
  background-color: #181414;
  min-height: 30px;
  border-radius: 5px 5px 0 0;
  gap: 10px;
  overflow-x: auto;
`;

export const NewFileButton = styled.button`
  background-color: #282424;
  height: 100%;
  margin: 0 30px 0 0;
  width: 45px;
  cursor: pointer;
  color: white;
  font-size: 1.2rem;
  border: green solid 2px;
  border-bottom: none;
`;

export const FileListItem = styled.div`
  display: flex;
  box-sizing: border-box;
  min-width: 70px;
  height: 100%;
  padding: 2px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${(p) => (p.isselected ? "#282424" : "transparent")};
  &:hover {
    background-color: white;
    color: green;
  }
`;

export const FileListItemText = styled.div`
  width: 100%;
  padding: 2px;
  margin: 4px;
`;

export const CloseBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  color: #f70a0a;
`;

export const MainRightSec = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  text-align: center;
  flex: 1;
  width: 40%;
  height: 90%;
  gap: 10px;
`;

export const RightSecTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
`;

export const RightSecTopItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  position: relative;
`;

export const RightSecTopText = styled.h2`
  font-weight: lighter;
  ${mobile({ fontSize: "14px" })};
  font-family: "Orbitron";
  font-size: 20px;
  
`;

export const RightSecTopImage = styled.img`
  height: 15vh;
  width: 10vw;
  position: relative;
  margin-right: 2rem;
  ${mobile({ height: "240px", width: "260px" })};
`;

export const RightSecBottom = styled.div`
  flex: 2;
  border-radius: 20px;
  width: 90%;
  height: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const RightSecInputContainer = styled.div`
  align-items: center;
  text-align: center;
  gap: 10px;
  display: flex;
  flex-direction: column;
  background-color: #171821;
  height: 100%;
  width: 100%;
  border: solid white 2px;
  border-radius: 20px;
  min-height: 200px;
`;

export const SectionTitleContainer = styled.div`
  display: flex;
  flex: 0.1;
  width: 95%;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const MainTab = styled.div`
  height: 100%;
  width: 25%;
  border-radius: 10px;
  background-color: #21222d;
  ${mobile({ width: "100%" })};
`;

export const SectionTitleText = styled.p`
  margin: 0;
  padding: 5px;
  font-size: 1rem;
  font-weight: bold;
  color: green;
  ${mobile({ fontSize: "10px" })};
`;

export const RightIOTextArea = styled.textarea`
  flex: 1;
  width: 100%;
  height: 90%;
  background-color: transparent;
  border: none;
  color: ${(p) => (p.success ? "white" : "red")};
  font-size: 1rem;
  padding: 10px;
  outline: none;
  resize: none;
  font-family: "Poppins", sans-serif;
  spellcheck: false;
  ${mobile({ fontSize: "9px" })};
`;
