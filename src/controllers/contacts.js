//src/controllers/contacts.js
import mongoose from 'mongoose';
import { ContactsCollection } from './db/models/contacts.js';

//all
export const getAllContacts = async (req, res) => {
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
};

//id
export const getContactById = async (req, res) => {
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
};
