const { User, Team, League } = require('../models')

module.exports = {
  async findAllUsers(req,res,next) {
    try {
      const users = await User.findAll();
      res.send(users);
      // next();
    } catch(e) {
        next(e)
    }
  },
  async findOneUser(req,res,next) {
    try {
      const userId = Number.parseInt(req.params.userId, 10);
      const user = await User.findOne({
        where: {
          id: userId
        },
        include: [{
          model: Team,
          where: {
            user_id: userId
          },
          include: [{
            model: League,
            attributes: ['name']
          }]
        }]
      });
      res.send(user);
      // next();
    } catch(e) {
        next(e)
    }
  },

}
