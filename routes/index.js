const router = require('express').Router();

router.use('/users', require('./userRouter'));
router.use('/teams', require('./teamRouter'));

module.exports = router;
