const express = require('express');

const serverCodeStructureController = require('../controllers/server-code-structure-controller');

const router = express.Router();

router.get('/',serverCodeStructureController.getServerCodeStructure);

router.post('/',serverCodeStructureController.updateServerCodeStructure);

module.exports = router;