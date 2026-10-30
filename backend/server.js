
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express';
import { connectDB } from './config/db.js';
import courseRouter from './routes/courseRouter.js';
import bookingRouter from './routes/bookingRouter.js';

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",

        // Production Frontend
        "https://skills-platform-orcin.vercel.app",

        // Admin Frontend
        "https://skills-platform-admin.vercel.app"
    ],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(clerkMiddleware());

// Database Connection
connectDB();

// Routes
app.use('/api/course', courseRouter);
app.use('/api/courses', courseRouter);
app.use('/api/booking', bookingRouter);

// Health Check
app.get('/', (req, res) => {
    res.send('API working');
});

// Start Server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server Started on port: ${port}`);
});
