const mongoose = require('mongoose');

const scopeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
    }
});

module.exports = mongoose.model('Scope',scopeSchema);