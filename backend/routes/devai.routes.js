const express = require("express");
const router = express.Router();
const { askDevAI } = require("../controllers/devai.controller");

router.post("/", askDevAI);

module.exports = router;
