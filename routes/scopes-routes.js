const express = require('express');

const scopesController = require('../controllers/scopes-controller');

const router = express.Router();

router.get('/',scopesController.getScopes);

router.post('/',scopesController.createScope);

router.patch('/:id',scopesController.updateScope); 

router.delete('/:id',scopesController.delScope);

module.exports = router;