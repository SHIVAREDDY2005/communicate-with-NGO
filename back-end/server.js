const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ngo", require("./routes/ngoRoutes"));
app.use("/api/volunteer", require("./routes/volunteerRoutes"));

app.use("/api/user", require("./routes/userRoutes"));

app.use("/api/opportunities", require("./routes/opportunityRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
app.get("/test", (req, res) => {
  res.send("Backend working");
});
