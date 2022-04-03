const express = require('express');

const notesController = require('../controllers/elements-notes-controller');

const router = express.Router();

router.get('/',notesController.getElements);

router.patch('/',notesController.updateElementNote);

router.post('/',notesController.getElementNote);

module.exports = router;