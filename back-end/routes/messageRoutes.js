const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  createOrGetConversation,
  sendMessage,
  getMessages
} = require("../controllers/messageController");

const router = express.Router();

router.post("/conversation", protect, createOrGetConversation);
router.post("/send", protect, sendMessage);
router.get("/:conversationId", protect, getMessages);

module.exports = router;