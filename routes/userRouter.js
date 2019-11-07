const router = require('express').Router({mergeParams:true});
const asyncHandler = require('express-async-handler')

const {findAllUsers, findOneUser} = require('../controllers/userController')

router.get('/', asyncHandler(findAllUsers))
router.get('/:userId', asyncHandler(findOneUser))

module.exports = router;
