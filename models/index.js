// require('dotenv').config();

const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10

// this is used on local machine

const db = new Sequelize({
  database: 'roster_manager',
  dialect:  'postgres',
  define:   {
    underscored:   true,
    returning:     true,
  },
});

// this is used on heroku

// const db = new Sequelize(
//   process.env.DATABASE_URL,
// {
//     underscored: true,
//     returning: true,
//   },
// );

const League = db.define('league', {
  name: {
    type: Sequelize.STRING(4),
    allowNull: false,
    unique: true,
  },
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING(32),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(64),
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING(64),
    allowNull: false,
  }
});

const Team = db.define('team', {
  name: {
    type: Sequelize.STRING(64),
    allowNull: false,
    unique: true,
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  slot: {
    type: Sequelize.STRING(8),
  },
  user_id: {
    type: Sequelize.SMALLINT,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  league_id: {
    type: Sequelize.SMALLINT,
    references: {
      model: 'league',
      key: 'id'
    }
  }
});

// Methods
User.checkIfValid = ((password,dbPassword) => {
    return promise = new Promise((resolve,reject) => {
      bcrypt.compare(password, dbPassword)
      .then(isValid => resolve(isValid))
      .catch(err => console.error(err))
    })
})

// Hooks
User.beforeCreate((user) => {
  return bcrypt.hash(user.password, SALT_WORK_FACTOR)
  .then(hash => user.password = hash)
  .catch(err => console.error(err))
})

//associations
League.hasMany(Team);
Team.belongsTo(League);
User.hasMany(Team);
Team.belongsTo(User);

module.exports = {
  Team,
  League,
  User,
  db
};

// const fun = (isFun) => {
// 	return new Promise((resolve,reject) => {
//     if(isFun){
//       console.log('yes it is fun')
//       resolve(isFun)
//     } else {
//       console.log('it is not fun')
//       reject(isFun)
//     }
//   })
// }
