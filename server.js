const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const endpoint = require("./src/routes/route");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// database connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("db connect"));

app.use(cors());
app.use(express.json());

// use user endpoint
app.use(endpoint);

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
