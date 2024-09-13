const router = require('express').Router();
const {saveHighScore} = require('./game.controller');

router.post('/saveScore', saveHighScore);

module.exports = router;