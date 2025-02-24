const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const linkRoutes = require("./routes/link.route");

// Initialize dotenv to access environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Enable CORS
app.use(cors());

// Route middleware for user authentication (register/login)
app.use("/api/user", userRoutes);
app.use("/api/links", linkRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Define the port from environment or default to 5000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
