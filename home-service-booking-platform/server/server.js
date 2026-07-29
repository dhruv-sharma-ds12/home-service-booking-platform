const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Test Route
app.get("/", (req, res) => {
    res.send("TrueFix Server Running");
});


// Server Port
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});