// mongo User model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    journal: {  // journal is an array of entry ids
        type: Array
    }
});

module.exports = User = mongoose.model('User', UserSchema);