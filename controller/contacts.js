const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getContacts = async (req, res) => {
    try {
        const result = await mongodb.getDB().collection('contacts').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getContact = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDB().collection('contacts').findOne({ _id: userId });
        
        if (!result) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getContacts, getContact };
