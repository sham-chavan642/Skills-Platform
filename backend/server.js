```javascript
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
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error("Blocked by CORS:", origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: [
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE',
        'OPTIONS'
    ],
    allowedHeaders: [
        'Content-Type',
        'Authorization'
    ],
    optionsSuccessStatus: 204
};

// Apply CORS before all routes and middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options(/.*/, cors(corsOptions));

// Body Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Clerk Middleware
app.use(clerkMiddleware());

// Database Connection
connectDB();

// API Routes
app.use('/api/course', courseRouter);
app.use('/api/courses', courseRouter);
app.use('/api/booking', bookingRouter);

// Health Check
app.get('/', (req, res) => {
    res.status(200).send('API working');
});

// Error Handler
app.use((err, req, res, next) => {
    console.error("Server Error:", err.message);

    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            success: false,
            message: 'CORS blocked this origin'
        });
    }

    return res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
});

// Start Server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server Started on port: ${port}`);
});
```
