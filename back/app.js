const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const logger = require("morgan");
require("dotenv").config();

const indexRouter = require("./routes/index");
const app = express();
const cors = require("cors");

app.use(logger("dev"));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);

module.exports = app;
