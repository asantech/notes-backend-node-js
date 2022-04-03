// const { Int32 } = require('mongodb'); // علت بررسی شود
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    type: {}, // علت بررسی شود
    createdDate: {},
    lastModificationDate: {},
    srcTypeId: {
        type: String,
    },
    srcName: {
        type: String,
    },
    srcURL: {
        type: String,
    },
    note: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Note',noteSchema);