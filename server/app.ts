import * as dotnev from 'dotenv';
dotnev.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

import errorMiddleware from './middlewares/error.middleware';
import userRoutes from './routes/user.routes';
import ErrorHandler from './utils/errorHandler';

const app = express();

// Middlewares
// Built In
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Third party middlewares
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(morgan('dev')); // logger

// Default home route
app.get('/', (_req, res) => {
  res.send('Hello from server');
});
// User routes
app.use('/api/v1/user', userRoutes);

// Not found Route
app.all('*', (req, res, next) => {
  next(new ErrorHandler(`Can't find the route ${req.originalUrl}`, 404));
});

app.use(errorMiddleware);

export default app;
