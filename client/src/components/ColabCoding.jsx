import { useState } from "react";
import toast from "react-hot-toast";

import * as colabCodingStyles from "./styled-components/ColabCoding.styles";

const {
    GroupChatContainer,
    IntroText,
    InnerContainer,
    ContainerHeading,
    RoomButton,
    RoomIdText,
    InputField,
} = colabCodingStyles

const GroupChat = ({roomId, setRoomId, code, socket, updateCode}) => {

    const [inputRoomId, setInputRoomId] = useState(null);

    const createRoom = () => {
        const newRoomId = Math.random().toString(36).substring(2, 10);
        setRoomId(newRoomId);
        joinRoom(newRoomId);
        toast.success(`Created and Joined Room: ${newRoomId}`);
    };

    const handleRoomJoin = () => {
        setRoomId(inputRoomId);
        joinRoom(inputRoomId);
        toast.success(`Joined Room: ${inputRoomId}`);
    };

    const joinRoom = (roomID) => {
        socket.emit('join-room',roomID,code,(initialCode)=>{
          updateCode('',initialCode);
        });
        
    }


    return (
        <GroupChatContainer>
            {/* Intro text */}
            <IntroText>&lt; Invite your friends into the Matrix <br/> Let the Cypher Flow ignite! /&gt;</IntroText>
            
            {/* Create Room Section */}
            <InnerContainer>
                <ContainerHeading>Create Room</ContainerHeading>
                {!roomId && <RoomButton onClick={createRoom}>Create Room</RoomButton>}
                {roomId && <RoomIdText>Room ID: {roomId}</RoomIdText>}
            </InnerContainer>

            {/* Join Room Section */}
            <InnerContainer>
                <ContainerHeading>Join Room</ContainerHeading>
                <InputField
                    type="text"
                    placeholder="Enter Room ID"
                    value={inputRoomId}
                    onChange={(e) => setInputRoomId(e.target.value)}
                />
                <RoomButton onClick={handleRoomJoin}>Join Room</RoomButton>
            </InnerContainer>
        </GroupChatContainer>
    );
};

export default GroupChat;
