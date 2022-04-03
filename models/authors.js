const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Author',authorSchema);