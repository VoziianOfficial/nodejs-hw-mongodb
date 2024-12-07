// src/middlewares/validateBody.js
import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false, // Показує всі помилки валідації
    });
    next();
  } catch (err) {
    const validationErrors = err.details.map((details) => ({
      message: details.message,
      path: details.path.join('.'),
    }));
    const error = createHttpError(400, 'Validation Error', {
      errors: validationErrors,
    });
    next(error);
  }
};
