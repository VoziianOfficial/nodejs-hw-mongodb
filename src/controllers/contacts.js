//src/controller/contacts.js

import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/contacts.js';
import { createContact, deleteContact } from '../services/contacts.js';
import { updateContact } from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

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

//patch
export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const updateData = req.body;

  const updatedContact = await updateContact(contactId, updateData);

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

//delete
export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};

//get
export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);

  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts,
      page: 2,
      perPage: 4,
      totalItems: 6,
      totalPages: 2,
      hasPreviousPage: true,
      hasNextPage: false,
    },
  });
};
