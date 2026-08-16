import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { notFoundHandler, errorMiddleware } from './middlewares/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(helmet());

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'AI Interview System API is running',
    data: {
      environment: process.env.NODE_ENV || 'development',
    },
  });
});

app.use('/api/v1/auth', authRoutes);

app.use(notFoundHandler);


app.use(errorMiddleware);

export default app;
