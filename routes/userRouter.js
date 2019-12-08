const router = require('express').Router({mergeParams:true});
const asyncHandler = require('express-async-handler')

const {findAllUsers, findOneUser, authenticateUser} = require('../controllers/userController')

router.get('/', asyncHandler(findAllUsers))
router.post('/login', asyncHandler(authenticateUser))
router.get('/:userId', asyncHandler(findOneUser))

module.exports = router;
