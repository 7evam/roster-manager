const { User } = require('../models')

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
  
}
