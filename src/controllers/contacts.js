//src / controllers / contacts.js;
import {
  createContact,
  updateContact,
  deleteContact,
  getAllContacts,
  getContactByIdService,
} from '../services/contacts.js'; // Все вызовы сервисов импортируются

// Получение всех контактов
export const getContactsController = async (req, res) => {
  const { page, perPage, sortBy, sortOrder, filter } = req.query;

  try {
    const { data, ...meta } = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter: { ...filter, userId: req.user._id }, // Добавляем фильтр по userId
    });

    res.json({
      status: 200,
      message: 'Contacts retrieved successfully',
      data: { data, ...meta },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

// Получение контакта по ID
export const getContactById = async (req, res) => {
  const { contactId } = req.params;

  try {
    const contact = await getContactByIdService(contactId, req.user._id);
    res.json({
      status: 200,
      message: `Contact with ID ${contactId} retrieved successfully`,
      data: contact,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

// Создание нового контакта
export const createContactsController = async (req, res) => {
  try {
    const contactData = { ...req.body, userId: req.user._id };
    const contact = await createContact(contactData);

    res.status(201).json({
      status: 201,
      message: 'Contact created successfully',
      data: contact,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

// Обновление контакта
export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const updateData = req.body;

  try {
    const updatedContact = await updateContact(
      contactId,
      updateData,
      req.user._id,
    );
    res.json({
      status: 200,
      message: 'Contact updated successfully',
      data: updatedContact,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

// Удаление контакта
export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  try {
    await deleteContact(contactId, req.user._id);
    res.status(204).send();
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};
