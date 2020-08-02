import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import './database';
import cors from 'cors';
import routes from './app/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => {
  console.log('Server started on port 3333.');
});
