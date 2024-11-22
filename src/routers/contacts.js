// src/routers/contacts.js;
import { Router } from 'express';
import {
  getAllContacts,
  getContactById,
  createContactsController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

//Rout
router.get('/contacts', ctrlWrapper(getAllContacts));

//Rout
router.get('/contacts/:contactId', ctrlWrapper(getContactById));

router.post('/contacts', ctrlWrapper(createContactsController));

export default router;
