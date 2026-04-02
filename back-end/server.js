const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const messageRoutes = require("./routes/messageRoutes");
const opportunityRoutes = require("./routes/opportunityRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
dotenv.config();
connectDB();

const app = express();
const PORT = Number(process.env.PORT) || 7860;

app.use(cors());
app.use(express.json());

app.use("/api/ngo", require("./routes/ngoRoutes"));
app.use("/api/volunteer", require("./routes/volunteerRoutes"));

app.use("/api/user", require("./routes/userRoutes"));

app.use("/api/opportunity", opportunityRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/applications", applicationRoutes);

app.use("/api/chat", messageRoutes);
app.use("/api/messages", messageRoutes);

app.get("/test", (req, res) => {
  res.send("Backend working");
});

app.get("/", (req, res) => {
  res.json({ status: "ok", service: "skillbridge-backend" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
