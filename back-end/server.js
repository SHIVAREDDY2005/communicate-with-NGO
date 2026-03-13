const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const applicationRoutes = require("./routes/applicationRoutes");
const ngoRoutes = require("./routes/ngoRoutes");
const opportunityRoutes = require("./routes/opportunityRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Connect DB */
connectDB();

/* Routes */
app.use("/api/application", applicationRoutes);
app.use("/api/ngo", ngoRoutes);
app.use("/api/opportunity", opportunityRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/user", userRoutes);

app.listen(5000, () => console.log("Server running on 5000"));