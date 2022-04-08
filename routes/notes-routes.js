const express = require('express');

const notesController = require('../controllers/notes-controller');

const router = express.Router();

router.get('/',notesController.getNotes);

router.post('/',notesController.createNote);

router.delete('/:noteId',notesController.delNote);

module.exports = router;