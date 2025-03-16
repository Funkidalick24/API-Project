const express = require("express");
const router = express.Router();
const contactController = require("../controller/contacts");

router.get("/", contactController.getContacts);
router.get("/:id", contactController.getContact);

module.exports = router;
