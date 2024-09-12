const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

// Express configeration
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// CORS Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// Routes
app.use("/auth", authRouter);
app.use("/users", userRouter);

// Listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
