const router = require('express').Router({mergeParams:true});
const asyncHandler = require('express-async-handler')

const {findAllTeams, findUsersTeams, rosterSwap, rosterFill } = require('../controllers/teamController')

router.get('/', asyncHandler(findAllTeams))
router.get('/:userId', asyncHandler(findUsersTeams))
router.patch('/swap', asyncHandler(rosterSwap))
router.patch('/fill', asyncHandler(rosterFill))

module.exports = router;
