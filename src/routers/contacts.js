// src/routers/contacts.js;

import { Router } from 'express';
import { getAllContacts, getContactById } from '../controllers/contacts.js';

const router = Router();

//Rout
router.get('/contacts', getAllContacts);

//Rout
router.get('/contacts/:contactId', getContactById);

export default router;
