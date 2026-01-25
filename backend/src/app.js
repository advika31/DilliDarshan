const express = require("express");
const cors = require("cors");

const nextActionRoutes = require("./routes/nextAction.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/next-action", nextActionRoutes);

module.exports = app;
