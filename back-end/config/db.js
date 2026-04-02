const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let memoryServer = null;

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      console.log("MONGO_URI not set. Starting in-memory MongoDB.");
      memoryServer = await MongoMemoryServer.create({
        instance: { dbName: "skillbridge" },
      });
      mongoUri = memoryServer.getUri();
    }

    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  if (memoryServer) {
    await memoryServer.stop();
  }
});

module.exports = connectDB;
