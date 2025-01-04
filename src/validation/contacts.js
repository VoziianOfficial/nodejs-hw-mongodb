import Joi from 'joi';

// Схема для створення контакту
export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().email(),
  photo: Joi.any(),
});

// Схема для оновлення контакту
export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  photo: Joi.any(),
}).or('name', 'phoneNumber', 'email'); // Вимагає хоча б одне поле
