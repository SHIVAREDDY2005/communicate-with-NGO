const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");

exports.createOrGetConversation = async (req, res) => {
  try {
    const { receiverId } = req.body;

    const sender = await User.findById(req.user.id);
    const receiver = await User.findById(receiverId);

    if (!receiver)
      return res.status(404).json({ message: "Receiver not found" });

    // 🔥 NGO ↔ Volunteer restriction
    if (sender.role === receiver.role) {
      return res.status(403).json({
        message: "Chat allowed only between NGO and Volunteer"
      });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [req.user.id, receiverId] }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user.id, receiverId]
      });
    }

    res.json(conversation);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, text } = req.body;

    const message = await Message.create({
      conversationId,
      sender: req.user.id,
      text
    });

    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: message._id
    });

    res.status(201).json(message);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId
    }).sort({ createdAt: 1 });

    res.json(messages);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};