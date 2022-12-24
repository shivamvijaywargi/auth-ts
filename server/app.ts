import * as dotnev from 'dotenv';
dotnev.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// Middlewares
// Built In
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Third party middlewares
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173, http://localhost:3000'],
    credentials: true,
  })
);
app.use(morgan('dev')); // logger

export default app;
