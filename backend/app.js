const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//routes Import
const userRoute = require("./routes/userRoutes");
const feedsRoutes = require("./routes/feedsRoutes");
const messageRoutes = require("./routes/messageRoutes");

const cors = require("cors");

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

//cookie parser import
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/api/v1", userRoute);
app.use("/api/v1", feedsRoutes);
app.use("/api/v1", messageRoutes);


module.exports = app;
