// src/servicer/contacts.js
import { ContactsCollection } from '../db/models/contacts.js';
import createHttpError from 'http-errors';

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, updateData) => {
  if (!contactId) {
    throw createHttpError(400, 'Contact ID is required');
  }
  const updatedContact = await ContactsCollection.findByIdAndUpdate(
    contactId,
    updateData,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedContact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findByIdAndDelete(contactId);
  return contact;
};
