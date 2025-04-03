const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const votingRoutes = require("./routes/votingRoutes");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", votingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
