const mongoose = require('mongoose');

const elementNoteSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    note: {
        type: String,
    },
});

module.exports = mongoose.model('ElementNote',elementNoteSchema);