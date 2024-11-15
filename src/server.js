import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { ContactsCollection } from './db/models/contacts.js';

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
  //Пошук всіх контактів
  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await ContactsCollection.find();
      res.send({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

  //Пошук одного контакта
  app.get('/contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      const contact = await ContactsCollection.findById(contactId);

      if (!contact) {
        return res.status(404).json({
          message: 'Contact not found',
        });
      }
      res.send({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
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
