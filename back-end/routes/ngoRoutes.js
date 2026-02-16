const express = require("express");
const router = express.Router();
const { registerNGO, loginNGO } = require("../controllers/ngoController");

router.post("/register", registerNGO);
router.post("/login", loginNGO);

module.exports = router;
