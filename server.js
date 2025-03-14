const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");
const assert = require("assert");

const app = express();
const port = Host.env.PORT || 3000;

// MongoDB connection URL
const url = "mmongodb+srv://faraidandara1:Funkidalick30@cluster0.nf8uh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "contactsDB";

// Middleware
app.use(bodyParser.json());

// MongoDB client connection
let db;
MongoClient.connect(url)
  .then((client) => {
    console.log("Connected to MongoDB");
    db = client.db(dbName);
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

// Routes
// GET all contacts
app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await db.collection("contacts").find({}).toArray();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// GET contact by ID
app.get("/api/contacts/:id", async (req, res) => {
  try {
    const contact = await db.collection("contacts").findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contact" });
  }
});

// POST new contact
app.post("/api/contacts", async (req, res) => {
  try {
    const contact = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      createdAt: new Date(),
    };
    const result = await db.collection("contacts").insertOne(contact);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to create contact" });
  }
});

// PUT update contact
app.put("/api/contacts/:id", async (req, res) => {
  try {
    const result = await db.collection("contacts").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          updatedAt: new Date(),
        },
      },
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json({ message: "Contact updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update contact" });
  }
});

// DELETE contact
app.delete("/api/contacts/:id", async (req, res) => {
  try {
    const result = await db.collection("contacts").deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
