import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import mongoose from 'mongoose';
import { ContactsCollection } from './db/models/contacts.js';

export const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

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

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({
        message: `Invalid contact ID: ${contactId}`,
      });
    }

    try {
      const contact = await ContactsCollection.findById(contactId);

      if (!contact) {
        return res.status(404).json({
          message: `Contact with id ${contactId} not found`,
        });
      }

      res.send({
        status: 200,
        message: `Successfully found contact with id ${contactId}`,
        data: contact,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

  app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
