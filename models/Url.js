const { nanoid } = require("nanoid");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
    longUrl: { type: String, required: true },
    shortUrl: { type: String },
    _id: {
        type: String,
        default: () => nanoid(8),
    },
});

const User = mongoose.model("Url", UrlSchema);

module.exports = User;