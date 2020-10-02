// require modules
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const auth = require("./middleware/auth");

// allows project to read from .env
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./config/config.env" });
}

// create instance of express server
const app = express();

// let express parse requests from client forms
app.use(express.json());

// connecting to mongodb database
connectDB();

// variable that represents the PORT number
const PORT = process.env.PORT || 5000;

// all routes go through auth middleware to check if its public or private access
app.all("/api/*", auth);

// express routing
app.use("/api/auth", require("./routes/auth"));
app.use("/api/entry", require("./routes/entries"));

// lets browser access the server through CRUD operations
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
