import cors from 'cors';
import express from 'express';
import { createServer } from "http";
import authRouter from './routes/auth.js';
import blogRouter from './routes/blog.js';
import chatRouter from './routes/chat.js';
import initSocket from './utils/socket.js';

const app = express();
const server = createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRouter);
app.use('/blog', blogRouter);
app.use('/chat', chatRouter);

//Init socket.io
initSocket(server, {});

export default server;
