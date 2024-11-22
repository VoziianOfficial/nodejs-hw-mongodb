//src/controller/contacts.js

import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/contacts.js';
import { createContact } from '../services/contacts.js';
// all
export const getAllContacts = async (req, res) => {
  const contacts = await ContactsCollection.find();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

// id
export const getContactById = async (req, res) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, `Invalid contact ID: ${contactId}`);
  }

  const contact = await ContactsCollection.findById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: contact,
  });
};

// post
export const createContactsController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};
