// import { io } from "socket.io-client";

// // connect to web socket
// const socket = io.connect("http://localhost:3000");

// const const io = socketio(server);
// // real time chat room socket client
// const socket = io();

// // unique name generator
// const generateName = () => { return Math.random().toString(36).substring(7); };

// username = generateName();
// room = "STUDYTHREEBARSCORE";

// // join chatroom
// socket.emit("joinRoom", { username, room });

// // get room and users
// socket.on("roomUsers", ({ room, users }) => {
//     console.log(room);
//     console.log(users);
// });

// // message from server
// socket.on("message", (message) => {
//     console.log(message);
// });
