// require modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
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

//CORS Middleware
app.use(cors());
/* TODO: add option {origin: "https://localhost:3000/" } or whatever the origin that the 
front end is running on so the server can only accept requests from the front end 
app.use(cors({origin: "https://mood-tracker.herokuapp.com/"}));
*/

// connecting to mongodb database
connectDB();

// all routes go through auth middleware to check if its public or private access
app.all("/api/*", auth);

// express routing
app.use("/auth", require("./routes/auth"));
app.use("/api/entry", require("./routes/entries"));

// variable that represents the PORT number
const PORT = process.env.PORT || 5000;

// lets browser access the server through CRUD operations
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
