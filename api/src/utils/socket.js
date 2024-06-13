import { Server } from "socket.io";

const initSocket = (server, config) => {

    const socket_config = {
        pingTimeout: 30000,
        allowEIO3: true,
        cors: {
            origin: '*',
        },
        ...config
    }

    // Socket server
    const io = new Server(server, socket_config);

    io.on('connection', (socket) => {
        console.log('a user connected', socket.client.id);
        socket.on('disconnect', () => {
            console.log('user disconnected', socket.client.id);
        });
        socket.on('setup', () => {
            socket.join('main_thread');
        })

        socket.on('new_message', (data) => {
            socket.in('main_thread').emit('message_received', data);
        });
    });
}

export default initSocket;
