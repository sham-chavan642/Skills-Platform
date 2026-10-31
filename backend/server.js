import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express';
import { connectDB } from './config/db.js';
import courseRouter from './routes/courseRouter.js';
import bookingRouter from './routes/bookingRouter.js';

const app = express();
const port = process.env.PORT || 4000;

// Allowed Frontend Origins
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "https://skills-platform-orcin.vercel.app",
    "https://skills-platform-admin-dusky.vercel.app"
];

// CORS Configuration
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle Preflight Requests
app.options(/.*/, cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

// Database Connection
connectDB();

// API Routes
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
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express';
import { connectDB } from './config/db.js';
import courseRouter from './routes/courseRouter.js';
import bookingRouter from './routes/bookingRouter.js';

const app = express();
const port = process.env.PORT || 4000;

// CORS Configuration
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "https://skills-platform-orcin.vercel.app",
        "https://skills-platform-admin-dusky.vercel.app"
    ],
    credentials: true
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

// Database Connection
connectDB();

// API Routes
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
