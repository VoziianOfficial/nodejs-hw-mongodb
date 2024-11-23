// src/routers/contacts.js;
import { Router } from 'express';
import {
  getAllContacts,
  getContactById,
  createContactsController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

//Rout
router.get('/contacts', ctrlWrapper(getAllContacts));
//Rout
router.get('/contacts/:contactId', ctrlWrapper(getContactById));
//Rout
router.post('/contacts', ctrlWrapper(createContactsController));
//Rout
router.patch('/contacts/:contactId', ctrlWrapper(updateContactController));
//Rout
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
