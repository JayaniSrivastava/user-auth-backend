require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();

// CONNECT DATABASE
connectDB();

// middleware
app.use(express.json());

// routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// test route
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

// start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});