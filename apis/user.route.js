const router = require('express').Router();
const {signup, loginUser} = require('./user.controller');


router.post('/create-user', signup);
router.post('/login', loginUser);

module.exports = router;