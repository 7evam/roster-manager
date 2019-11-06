const router = require('express').Router({mergeParams:true});
const asyncHandler = require('express-async-handler')

const {findAllUsers} = require('../controllers/userController')

router.get('/', asyncHandler(findAllUsers))

module.exports = router;
