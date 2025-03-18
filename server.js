const express = require("express");
const app = express();
const mongodb = require("./data/database");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cors = require("cors");
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Update swagger host based on environment
if (process.env.NODE_ENV === 'production') {
  swaggerDocument.host = process.env.HOST;
} else {
  swaggerDocument.host = `localhost:${port}`;
}

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Add redirect from root to api-docs
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// This should come after the redirect
app.use("/", require("./routes"));

// Initialize the database and start the server

mongodb.initDB((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database connected and Server running on port ${port}`);
    });
  }
});
