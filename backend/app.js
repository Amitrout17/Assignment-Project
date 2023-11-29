const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

//routes Import
const userRoute = require("./routes/userRoutes");
const feedsRoutes = require("./routes/feedsRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificaionRoutes = require("./routes/notificationRoutes");

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
app.use("/api/v1", notificaionRoutes);

app.use("/uploads", express.static(path.join(__dirname, "./backend/uploads")));
console.log(path.join(__dirname, "/uploads"));

//for sending files

app.get("/uploads/:file", (req, res) => {
  try {
    const filePath = path.join(__dirname, `./uploads/${req.params.file}`);
    console.log(filePath);
    res.sendFile(filePath);
  } catch (error) {
    console.log(error);
  }
});


module.exports = app;
