import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello world!',
  });
});

router.use((req, res, next) => {
  res.status(404).json({
    message: 'Not found',
  });
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
});

export default router;
