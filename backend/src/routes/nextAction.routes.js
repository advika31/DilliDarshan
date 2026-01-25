const express = require("express");
const router = express.Router();

const { getNextAction } = require("../controllers/nextAction.controller");

router.get("/", getNextAction);

module.exports = router;
