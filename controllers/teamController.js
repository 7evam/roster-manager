const { Team } = require('../models')

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
        }
      })
      res.send(teams);
      // next();
    } catch(e) {
        next(e)
    }
  },
}
