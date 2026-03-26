const express = require("express");
const cors = require("cors");

const errorHandler = require("./middleware/error.middleware");
const notFound = require("./middleware/notFound.middleware");

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

// base route
app.use("/api", routes);

// health check (optional keep)
app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server running" });
});

// 404 handler
app.use(notFound);

// global error handler (must be last)
app.use(errorHandler);

module.exports = app;