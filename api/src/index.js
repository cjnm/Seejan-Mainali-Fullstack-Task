import express from 'express';
import cors from 'cors';

// Importing routes
import authRouter from './routes/auth.js';
import blogRouter from './routes/blog.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRouter);
app.use('/blog', blogRouter);

export default app;
