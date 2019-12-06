const { Team, League } = require('../models')

module.exports = {
  async findAllTeams(req,res,next) {
    try {
      const teams = await Team.findAll();
      res.send(teams);
      // next();
    } catch(e) {
        next(e)
    }
  },
  async findUsersTeams(req,res,next) {
    try {
      const userId = Number.parseInt(req.params.userId, 10);
      const teams = await Team.findAll({
        where: {
          user_id: userId
        },
        include: [League]
      })
      res.send(teams);
      // next();
    } catch(e) {
        next(e)
    }
  },
  async rosterSwap(req,res,next) {
    try {
      const {team1id, team2id, team1slot, team2slot} = req.body
      console.log('in the patch')
      Team.update({
        slot: team2slot
      }, {
        where: {
          id: team1id
        }
      })
      Team.update({
        slot: team1slot
      }, {
        where: {
          id: team2id
        }
      })
      res.sendStatus(200)
    } catch(e) {
      next(e)
    }
  },
  async rosterFill(req,res,next) {
    try{
      Team.update({
        slot: req.body.slot
      }, {
        where: {
          id: req.body.teamId
        }
      })
      res.sendStatus(200)
    } catch(e){
      next(e)
    }
  }
}
