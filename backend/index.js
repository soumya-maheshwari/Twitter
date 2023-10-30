const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const profileRoutes = require("./routes/profileRoutes");
const commentRoutes = require("./routes/commentRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const { errorMiddleware } = require("./middleware/ErrorHandler");
app.use(express.json());
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));
const server = app.listen(process.env.PORT);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("database connected");
  } catch (err) {
    console.log(err);
  }
};
connectDB();
console.log(`Connected to port ${process.env.PORT}`);

// Global Error Handling
app.use(errorMiddleware);

// app.use(express.static(path.join(__dirname, "./media")));

// Serve static files from the 'media' directory
// app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/media", express.static("media"));

//Routes
app.use("/auth", errorMiddleware, authRoutes);
app.use("/post", errorMiddleware, postRoutes);
app.use("/profile", errorMiddleware, profileRoutes);
app.use("/comment", errorMiddleware, commentRoutes);
app.use("/chat", errorMiddleware, chatRoutes);
app.use("/message", errorMiddleware, messageRoutes);
