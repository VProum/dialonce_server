const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
});

mongoose.connection.on("connected", () => console.log("mongodb connected"));

mongoose.connection.on("error", () => console.log("db error"));