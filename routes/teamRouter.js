const router = require('express').Router({mergeParams:true});
const asyncHandler = require('express-async-handler')

const {findAllTeams, findUsersTeams} = require('../controllers/teamController')

router.get('/', asyncHandler(findAllTeams))
router.get('/:userId', asyncHandler(findUsersTeams))

module.exports = router;
