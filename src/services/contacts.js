// src/servicer/contacts.js
import { ContactsCollection } from '../db/models/contacts.js';

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};
