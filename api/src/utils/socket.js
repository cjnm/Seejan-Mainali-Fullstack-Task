import { Server } from "socket.io";
import { decodeToken } from "./jwt.js";
import { getUserInfo } from "../model/Users.js";

const initSocket = (server, config) => {
    try {
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

            socket.on('new_message', async (data) => {
                const { message, auth: jwt_token } = data;

                // verify if a loggedin user has sent the message
                if (!jwt_token) {
                    console.log('no jwt token', {jwt_token})
                    return;
                }

                const token = jwt_token.split(' ')[1];
                if (!token) {
                    console.log('no token', {token})
                    return;
                }

                const decoded_token = decodeToken(token);
                if (!decoded_token) {
                    console.log('no decoded token', {decoded_token, user: decoded_token.username})
                    return;
                };

                const user = await getUserInfo(decoded_token.username);
                if (!user || !Array.isArray(user) || !user.length) {
                    console.log('no user', {user})
                    return;
                }

                const { avatar_url, username } = user[0];

                console.log({ message, username, avatar_url })
                socket.in('main_thread').emit('message_received', { message, username, avatar_url });
            })
        });
    } catch (err) {
        console.log(err)
    }
}

export default initSocket;
