const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all contacts
const getContacts = async (req, res) => {
    try {
        const result = await mongodb.getDB().collection('contacts').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single contact
const getContact = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDB().collection('contacts').findOne({ _id: userId });
        if (!result) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create new contact
const createContact = async (req, res) => {
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const result = await mongodb.getDB().collection('contacts').insertOne(contact);
        if (result.acknowledged) {
            res.status(201).json({ id: result.insertedId });
        } else {
            res.status(500).json({ message: 'Error creating contact' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update contact
const updateContact = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const result = await mongodb.getDB()
            .collection('contacts')
            .updateOne({ _id: userId }, { $set: contact });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete contact
const deleteContact = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDB()
            .collection('contacts')
            .deleteOne({ _id: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};
