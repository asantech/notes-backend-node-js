const mongoose = require('mongoose');

const serverCodeStructureSchema = new mongoose.Schema({
    structure: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('ServerCodeStructure',serverCodeStructureSchema);