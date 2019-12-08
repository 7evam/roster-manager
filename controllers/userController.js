const { User, Team, League } = require('../models')

module.exports = {
  async authenticateUser(req,res,next) {
    try{
      const user = await User.findOne({
        where: {
          email: req.body.email
        },
      });
      let isValid = await User.checkIfValid(req.body.password,user.password)
      if(isValid){
        console.log('password is correct')
      } else {
        console.log('password is the worst')
      }
      res.send('nice something is working')
    } catch(e){
      next(e)
    }
  },
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
