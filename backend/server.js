
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
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'https://skills-platform-orcin.vercel.app',
    'https://skills-platform-admin-dusky.vercel.app'
];

// CORS Configuration
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        console.error('Blocked by CORS:', origin);
        return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204
}));

// Handle Preflight Requests
app.options('*', cors());

// Body Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Clerk Middleware
app.use(clerkMiddleware());

// Health Check
app.get('/', (req, res) => {
    res.status(200).send('API working');
});

// Database Connection
connectDB();

// API Routes
app.use('/api/course', courseRouter);
app.use('/api/courses', courseRouter);
app.use('/api/booking', bookingRouter);

// Error Handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err);

    return res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// Start Server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server Started on port: ${port}`);
});
