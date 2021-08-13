require("dotenv").config();
require("./config/dbConnection");

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");

var app = express();
const cors = require("cors");

const corsOptions = { origin: process.env.FRONTEND_URL, credentials: true };
app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public/build")));

app.use("/", indexRouter);

// 404 Middleware
app.use((req, res, next) => {
    const error = new Error("Ressource not found.");
    error.status = 404;
    next(error);
});

// Error handler middleware
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV !== "production") {
        console.error(err);
        res.sendFile(path.join(__dirname, "public/build/index.html"));
    }
    console.log("An error occured");
    res.status(err.status || 500);
    if (!res.headersSent) {
        res.json(err);
    }
});

module.exports = app;