import { Router } from 'express';
import {
  getContactById,
  createContactsController,
  updateContactController,
  deleteContactController,
  getContactsController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

//Rout
router.get('/', ctrlWrapper(getContactsController));
//Rout
router.get('/:contactId', isValidId, ctrlWrapper(getContactById));
//Rout
router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactsController),
);
//Rout
router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);
//Rout
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

//Rout
router.use(authenticate);
router.get('/', ctrlWrapper(getContactsController));
export default router;
