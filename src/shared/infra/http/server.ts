import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import '../typeorm';
import '../../container';
import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import routes from './routes';
import { AppError } from '../../errors/AppError';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.error(error);

    return response.status(500).json({
      status: 'error',
      errorName: error.name,
      error: error.message,
      stack: error.stack,
      message: 'Internal server error',
    });
  },
);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server started on port ${process.env.PORT}!`);
});
