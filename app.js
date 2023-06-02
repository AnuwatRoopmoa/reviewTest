import express from "express";
import morgan from "morgan";
import cors from "cors";
import reviewsRouter from './routers/reviews.js';

// import createUser from "./controllers/users.js"
// make a new express app
const app = express();

// Middleware
app.use(morgan('combined')); // logging
app.use(express.json()); // for parsing application/json

// CORS configuration
app.use(cors({
    origin: [
        /\.voornaamnaam\.ikdoeict\.be$/, // Matches all subdomains under voornaamnaam.ikdoeict.be
        /^(https?:\/\/)?localhost(:\d+)?$/, // Matches localhost with any port 
        /\.reviewtest\.onrender\.com$/,
        /^(https?:\/\/)?sql7.freesqldatabase.com(:\d+)?$/
    ],
    methods: 'GET, POST, PUT, DELETE', // Specify the allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization' // Specify the allowed request headers
}));
// Routes
app.use('/api/v1/reviews', reviewsRouter);
export { app };
