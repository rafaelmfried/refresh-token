import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { router } from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3332;

app.use(express.json());
app.use(router);
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
      status: "Error",
      mesage: error.message,
    });
  }
);

app.listen(PORT,() => {
  console.log(`Server is running at port ${PORT}`)
});