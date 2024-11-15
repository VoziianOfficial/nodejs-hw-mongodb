import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

export const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware для роботи з JSON
  app.use(express.json());
  // Налаштування CORS
  app.use(cors());

  // Налаштування логера
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
export default setupServer;
