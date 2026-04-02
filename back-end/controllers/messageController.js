const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");
const Application = require("../models/Application");
const Opportunity = require("../models/Opportunity");

const findConversation = async (userA, userB) => {
  return Conversation.findOne({
    participants: { $all: [userA, userB] },
  });
};

const getPublicUser = (user) => {
  if (!user) return null;
  const plain = user.toObject ? user.toObject() : { ...user };
  return {
    _id: plain._id,
    name: plain.name,
    email: plain.email,
    role: plain.role,
    organizationName: plain.organizationName,
  };
};

exports.createOrGetConversation = async (req, res) => {
  try {
    const { receiverId } = req.body;

    if (!receiverId) {
      return res.status(400).json({ message: "receiverId is required" });
    }

    const sender = await User.findById(req.user.id);
    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    if (sender.role === receiver.role) {
      return res.status(403).json({
        message: "Chat allowed only between NGO and Volunteer",
      });
    }

    let conversation = await findConversation(req.user.id, receiverId);

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user.id, receiverId],
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

    if (!conversationId || !text) {
      return res
        .status(400)
        .json({ message: "conversationId and text are required" });
    }

    const message = await Message.create({
      conversationId,
      sender: req.user.id,
      text,
    });

    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: message._id,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const meId = req.user._id;

    const conversations = await Conversation.find({
      participants: meId,
    })
      .populate("participants", "name email role organizationName")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    const contacts = await Promise.all(
      conversations.map(async (conversation) => {
        const otherUser = conversation.participants.find(
          (participant) => String(participant._id) !== String(meId)
        );

        if (!otherUser) return null;

        const unreadCount = await Message.countDocuments({
          conversationId: conversation._id,
          sender: otherUser._id,
          status: { $ne: "read" },
        });

        return {
          _id: otherUser._id,
          name: otherUser.organizationName || otherUser.name,
          email: otherUser.email,
          role: otherUser.role,
          lastMessage: conversation.lastMessage?.text || "",
          lastMessageAt:
            conversation.lastMessage?.createdAt || conversation.updatedAt || null,
          unreadCount,
        };
      })
    );

    // Fallback: derive chat contacts from applications when conversation documents
    // are missing (older data), so message screen still works immediately.
    let candidateUserIds = [];

    if (req.user.role === "volunteer") {
      const applications = await Application.find({ volunteer: meId })
        .populate({
          path: "opportunity",
          select: "ngo",
        })
        .select("opportunity");

      candidateUserIds = applications
        .map((app) => app.opportunity?.ngo)
        .filter(Boolean);
    } else if (req.user.role === "ngo") {
      const opportunities = await Opportunity.find({ ngo: meId }).select("_id");
      const opportunityIds = opportunities.map((opp) => opp._id);

      if (opportunityIds.length > 0) {
        const applications = await Application.find({
          opportunity: { $in: opportunityIds },
        }).select("volunteer");

        candidateUserIds = applications.map((app) => app.volunteer).filter(Boolean);
      }
    }

    if (candidateUserIds.length > 0) {
      const existingIds = new Set(
        contacts.filter(Boolean).map((contact) => String(contact._id))
      );

      const missingIds = Array.from(
        new Set(candidateUserIds.map((id) => String(id)))
      ).filter((id) => !existingIds.has(id) && id !== String(meId));

      if (missingIds.length > 0) {
        const users = await User.find({ _id: { $in: missingIds } }).select(
          "name email role organizationName"
        );

        for (const user of users) {
          contacts.push({
            _id: user._id,
            name: user.organizationName || user.name,
            email: user.email,
            role: user.role,
            lastMessage: "",
            lastMessageAt: null,
            unreadCount: 0,
          });
        }
      }
    }

    const filtered = contacts
      .filter(Boolean)
      .sort((a, b) => new Date(b.lastMessageAt || 0) - new Date(a.lastMessageAt || 0));

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getThread = async (req, res) => {
  try {
    const meId = req.user._id;
    const otherId = req.params.userId;

    const otherUser = await User.findById(otherId).select(
      "name email role organizationName"
    );

    if (!otherUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (otherUser.role === req.user.role) {
      return res.status(403).json({
        message: "Chat allowed only between NGO and Volunteer",
      });
    }

    let conversation = await findConversation(meId, otherId);
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [meId, otherId],
      });
    }

    const messages = await Message.find({ conversationId: conversation._id }).sort({
      createdAt: 1,
    });

    res.json({
      conversationId: conversation._id,
      otherUser: getPublicUser(otherUser),
      messages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markThreadAsRead = async (req, res) => {
  try {
    const meId = req.user._id;
    const otherId = req.params.userId;

    const conversation = await findConversation(meId, otherId);

    if (!conversation) {
      return res.json({ success: true, updated: 0 });
    }

    const result = await Message.updateMany(
      {
        conversationId: conversation._id,
        sender: otherId,
        status: { $ne: "read" },
      },
      { $set: { status: "read" } }
    );

    res.json({
      success: true,
      updated: result.modifiedCount ?? 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendMessageToUser = async (req, res) => {
  try {
    const meId = req.user._id;
    const otherId = req.params.userId;
    const { text } = req.body;

    if (!text || !String(text).trim()) {
      return res.status(400).json({ message: "text is required" });
    }

    const receiver = await User.findById(otherId).select("role");
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    if (receiver.role === req.user.role) {
      return res.status(403).json({
        message: "Chat allowed only between NGO and Volunteer",
      });
    }

    let conversation = await findConversation(meId, otherId);
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [meId, otherId],
      });
    }

    const message = await Message.create({
      conversationId: conversation._id,
      sender: meId,
      text: String(text).trim(),
      status: "sent",
    });

    await Conversation.findByIdAndUpdate(conversation._id, {
      lastMessage: message._id,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
