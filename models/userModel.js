const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the username"],
    },
    address: {
        type: String,
        required: [true, "Please add the address"],
    },
    password: {
        type: String,
        required: [true, "Please add the user password"],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema); // Use mongoose.model, not mongoose.Model
