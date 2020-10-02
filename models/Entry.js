// mongo User model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    author: {
        type: String,
        required: true
    },
    body: Object,
    moodColor: {
        type: String,  // maybe a different data type might be better?
        required: true
    }, 
}, {
    timestamps: true
});

module.exports = Entry = mongoose.model('Entry', EntrySchema);