import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import io from "socket.io-client";
import toast from "react-hot-toast";


import CodeEditor from "../components/CodeEditor";
import EditorUtilityBar from "../components/EditorUtilityBar";
import CollabCoding from "../components/ColabCoding";
import ChatBox from "../components/ChatBox";

import * as S from "../components/styled-components/codeIDE.styles";

const {
  Main,
  MainLeftSec,
  ModalButton,
  TextIOContainer,
  FilesListControl,
  NewFileButton,
  FileListItem,
  FileListItemText,
  CloseBtnContainer,
  CloseButton,
  MainRightSec,
  RightSecTop,
  RightSecTopItem,
  RightSecTopText,
  RightSecTopImage,
  RightSecBottom,
  RightSecInputContainer,
  SectionTitleContainer,
  MainTab,
  SectionTitleText,
  RightIOTextArea,
} = S;


const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL;
const MAX_FILES = 10;
const DEFAULT_FIRST_FILE = {
  id: 1,
  filename: "Default File",
  language: "python",
  code: "print('Hello, World!')",
};


/* Component */
const CodeIDE = () => {
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);
  const [Username, setUsername] = useState('');

  const [currentModal, setCurrentModal] = useState(0);
  const [formData, setFormData] = useState({
    input: "",
    output: "",
    files: [DEFAULT_FIRST_FILE],
  });
  const formDataRef = useRef(formData);
  const [currFile, setCurrFile] = useState(DEFAULT_FIRST_FILE.id);
  const currFileRef = useRef(currFile);

  const [roomId, setRoomId] = useState(null);

  const [ResultToastId, setResultToastId] = useState('');

  // keep refs in sync for event handlers
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    currFileRef.current = currFile;
  }, [currFile]);

  const currentFileIndex = useMemo(
    () => formData.files.findIndex((f) => f.id === currFile),
    [formData.files, currFile]
  );


  /* Socket setup and event bindings */
  useEffect(() => {
    const query = { token: JSON.parse(localStorage.getItem("token") || "null") };
    const sock = io(SOCKET_SERVER_URL, { query });
    socketRef.current = sock;
    setSocket(sock);

    const decodedUsername = decodeToken();
    if (decodedUsername != null){
      setUsername(decodedUsername);
    }

    if (Username) {
      sock.emit("register-user", Username, (submissionHistory) => {
        // quiet log; useful for debugging
        console.log("Submission History:", submissionHistory);
      });
    }

    const onSetCode = (code) => {
      // update only first file per original behavior
      setFormData((prev) => {
        const updated = {
          ...prev,
          files: prev.files.map((file) =>
            file.id === 1 ? { ...file, code } : file
          ),
        };
        return updated;
      });
    };

    const onExecutionResult = (result) => {
      console.log("Execution Result:", result);
      toast.dismiss(ResultToastId);
      
      if (result.status === "FAILED"){
        toast.error("Error in Code");
        changeHandler('output', result.stderr); 
      }
      else if (result.status==="TLE"){
        toast.error("Time Limit Exceeded!");
        changeHandler('output', result.error);
      }
      else{
        toast.success("Code Executed Successfully");
        changeHandler('output', result.stdout); 
      }
    };

    const onSubmissionHistory = (history) => {
      console.log("Submission History for current user:", history);
    };

    sock.on("set-code", onSetCode);
    sock.on("execution-result", onExecutionResult);
    sock.on("set-submission-history", onSubmissionHistory);

    return () => {
      sock.off("set-code", onSetCode);
      sock.off("execution-result", onExecutionResult);
      sock.off("set-submission-history", onSubmissionHistory);
      sock.disconnect();
      socketRef.current = null;
    };
  }, [Username]);

  const changeHandler = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);


  const decodeToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        // JWT format: header.payload.signature
        const payload = token.split(".")[1];

        // Base64URL → Base64
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");

        const decodedPayload = JSON.parse(atob(base64));

        return decodedPayload.username || null;

    } catch (err) {
        console.error("Invalid token", err);
        return null;
    }
  }

  const updateCode = useCallback(
    (_field, code) => {
      // update current file's code
      setFormData((prev) => {
        const files = prev.files.map((file) =>
          file.id === currFileRef.current ? { ...file, code } : file
        );
        return { ...prev, files };
      });

      if (roomId && currFileRef.current === 1 && socketRef.current) {
        socketRef.current.emit("send-code", code, roomId);
      }
    },
    [roomId]
  );

  const createNewFile = useCallback(
    (name = "") => {
      setFormData((prev) => {
        if (prev.files.length >= MAX_FILES) {
          toast.error(`Maximum ${MAX_FILES} files allowed! Please remove a file to create a new one.`);
          return prev;
        }
        const lastId = prev.files.length ? prev.files[prev.files.length - 1].id : 0;
        const newId = lastId + 1;
        const newFile = {
          id: newId,
          filename: name || `file ${newId}`,
          language: "python",
          code:
            "# Python Selected.\n# Change to the language of your choice.\n# Happy Coding :)",
        };
        // set current file after state update
        setCurrFile(newId);
        return { ...prev, files: [...prev.files, newFile] };
      });
    },
    []
  );

  const handleCloseFile = useCallback((id) => {
    if (id === 1) return; // prevent closing primary file
    setFormData((prev) => {
      const files = prev.files.filter((f) => f.id !== id);
      return { ...prev, files };
    });
    setCurrFile(1);
  }, []);

  const checkOutput = useCallback(() => {
    try {
      return !formData.output.startsWith("Error:");
    } catch {
      return false;
    }
  }, [formData.output]);

  const currentFile =
    currentFileIndex >= 0 ? formData.files[currentFileIndex] : DEFAULT_FIRST_FILE;

  return (
    <Main>
      <MainLeftSec>
        <SectionTitleContainer>
          <ModalButton isselected={currentModal === 0} onClick={() => setCurrentModal(0)}>
            <SectionTitleText>Code </SectionTitleText>
            <i className="fa-solid fa-code" />
          </ModalButton>
          <ModalButton isselected={currentModal === 1} onClick={() => setCurrentModal(1)}>
            <SectionTitleText>Connect </SectionTitleText>
            <i className="fa-solid fa-users" />
          </ModalButton>
        </SectionTitleContainer>

        {currentModal === 0 && (
          <TextIOContainer>
            <FilesListControl>
              <NewFileButton onClick={() => createNewFile("")}>
                <i className="fa-solid fa-file-circle-plus" />
              </NewFileButton>

              {formData.files.map((file) => (
                <FileListItem key={file.id} isselected={currFile === file.id}>
                  <FileListItemText onClick={() => setCurrFile(file.id)}>
                    {file.filename}
                  </FileListItemText>
                  <CloseBtnContainer>
                    <CloseButton onClick={() => handleCloseFile(file.id)}>
                      <i className="fa-solid fa-circle-xmark" />
                    </CloseButton>
                  </CloseBtnContainer>
                </FileListItem>
              ))}
            </FilesListControl>

            <EditorUtilityBar formData={formData} currFile={currFile} changeHandler={changeHandler} setResultToastId={setResultToastId} />

            <CodeEditor
              options={{
                mode: currentFile.language,
                name: currentFile.filename,
                value: currentFile.code,
              }}
              changeHandler={updateCode}
              field="code"
            />
          </TextIOContainer>
        )}

        {currentModal === 1 && (
          <TextIOContainer>
            <CollabCoding
              setRoomId={setRoomId}
              roomId={roomId}
              socket={socket}
              updateCode={updateCode}
              code={formData.files[0]?.code}
            />
          </TextIOContainer>
        )}
      </MainLeftSec>

      <MainRightSec>
        <RightSecTop>
          <RightSecTopItem>
            <RightSecTopImage src="./astro3.png" />
          </RightSecTopItem>

          <RightSecTopItem>
            <RightSecTopText>
              Break free! Enter the Cypher Matrix... <span style={{ fontWeight: 800 }}>&lt;CypherFlow /&gt;</span>
            </RightSecTopText>
          </RightSecTopItem>
        </RightSecTop>

        <RightSecBottom>
          <RightSecInputContainer>
            <SectionTitleContainer>
              <MainTab>
                <SectionTitleText>Input</SectionTitleText>
              </MainTab>
            </SectionTitleContainer>
            <TextIOContainer>
              <CodeEditor
                options={{
                  mode: "text",
                  name: "input",
                  value: formData.input,
                }}
                field="input"
                changeHandler={changeHandler}
              />
            </TextIOContainer>
          </RightSecInputContainer>

          <RightSecInputContainer>
            <SectionTitleContainer>
              <MainTab>
                <SectionTitleText>Output</SectionTitleText>
              </MainTab>
            </SectionTitleContainer>
            <TextIOContainer>
              <RightIOTextArea value={formData.output} name="output" readOnly success={checkOutput()} />
            </TextIOContainer>
          </RightSecInputContainer>
        </RightSecBottom>
      </MainRightSec>

      <ChatBox />
    </Main>
  );
};

export default CodeIDE;