const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const messageRoutes = require("./routes/messageRoutes");
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ngo", require("./routes/ngoRoutes"));
app.use("/api/volunteer", require("./routes/volunteerRoutes"));

app.use("/api/user", require("./routes/userRoutes"));

app.use("/api/opportunities", require("./routes/opportunityRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));

app.use("/api/messages", messageRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
app.get("/test", (req, res) => {
  res.send("Backend working");
});