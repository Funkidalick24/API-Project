const express = require("express");
const app = express();
const mongodb = require("./data/database");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Add redirect from root to api-docs
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// This should come after the redirect
app.use("/", require("./routes"));

mongodb.initDB((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database connected and Server running on port ${port}`);
    });
  }
});
