const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const {
  createOrGetConversation,
  sendMessage,
  getMessages,
  getContacts,
  getThread,
  markThreadAsRead,
  sendMessageToUser,
} = require("../controllers/messageController");

const router = express.Router();

// Existing message endpoints
router.post("/conversation", protect, createOrGetConversation);
router.post("/send", protect, sendMessage);

// Frontend-compatible chat endpoints
router.get("/contacts", protect, getContacts);
router.get("/thread/:userId", protect, getThread);
router.post("/thread/:userId", protect, sendMessageToUser);
router.put("/thread/:userId/read", protect, markThreadAsRead);

// Existing message endpoint (keep this last so it does not catch /contacts or /thread)
router.get("/:conversationId", protect, getMessages);

module.exports = router;
