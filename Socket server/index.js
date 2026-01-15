const express = require('express');
const http = require('http');
const socket = require('socket.io');
require('dotenv').config();

const { connectDB, fetchSubmissionHistory } = require('./services/database');
const { createRedisSubscriber,subscribeToResults } = require('./services/redis');

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
const PORT = process.env.PORT || 4001;

const app = express();
const server = http.createServer(app);
const io = socket(server, {
        cors: {
                origin: CLIENT_URL,
                methods: ['GET', 'POST'],
                allowedHeaders: ['Content-Type', 'Authorization'],
                credentials: true,
        }
});

const userToSocket = new Map(); // username -> socketId
const socketToUser = new Map(); // socketId -> username
const codeStorage = []; // { Id: roomID, code: code }

// store in cache and database in production

io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('disconnect', () => {
                const username = socketToUser.get(socket.id);
                console.log('User:', username, 'disconnected.');
                socketToUser.delete(socket.id);
                userToSocket.delete(username);
        });

        socket.on('register-user', async (username) => {
                userToSocket.set(username, socket.id);
                socketToUser.set(socket.id, username);
                console.log('Registered user:', username, 'with socket ID:', socket.id);

                // Fetch and send submission history
                const submissionHistory = await fetchSubmissionHistory(username);
                socket.emit('set-submission-history', submissionHistory);
        });

        socket.on('join-room', (roomID, initialCode, setCode) => {
                const username = socketToUser.get(socket.id);
                socket.join(roomID);
                console.log(`${username} joined room: ${roomID}`);

                const room = codeStorage.find((room) => room.Id === roomID)

                if (room) setCode(room.code);
                else codeStorage.push({ Id: roomID, code: initialCode });
        });

        socket.on('send-code', (code, roomID) => {
                const room = codeStorage.find((room) => room.Id === roomID);

                if (room) {
                        room.code = code;

                        const index = codeStorage.findIndex((room) => room.Id === roomID);
                        codeStorage[index] = room;
                }
                else {
                        codeStorage.push({ Id: roomID, code: code });
                }

                socket.to(roomID).emit('set-code', code);
        });

        socket.on('leave-group', (roomID) => {
                socket.leave(roomID);
                console.log('User', socketToUser.get(socket.id), 'left room:', roomID);
        });
});


(async () => {
        try {
                await connectDB();

                const subscriber = await createRedisSubscriber();
                await subscribeToResults(subscriber, io);

                server.listen(PORT, () => {
                        console.log(`Socket server is running on port ${PORT}`);
                })
        }
        catch (error) {
                console.error("Failed to start server:", error);
                process.exit(1);
        }
})();
