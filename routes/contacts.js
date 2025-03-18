const express = require('express');
const router = express.Router();
const contactsController = require('../controller/contacts');

// GET all contacts
router.get('/', contactsController.getContacts);

// GET single contact
router.get('/:id', contactsController.getContact);

// POST new contact
router.post('/', contactsController.createContact);

// PUT update contact
router.put('/:id', contactsController.updateContact);

// DELETE contact
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
