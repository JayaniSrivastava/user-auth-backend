require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// CONNECT DATABASE
connectDB();

// middleware
app.use(express.json());
app.use(cors());

// routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const postRoutes = require("./routes/postRoutes");
app.use("/api/posts", postRoutes);

// test route
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

// start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});