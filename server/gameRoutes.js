const express = require('express');
const router = express.Router();
const controller = require('./gameControllers.js');

router.get('/new', controller.newGame);
router.post('/move', controller.makeMove);

module.exports = router;