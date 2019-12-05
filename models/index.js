// require('dotenv').config();

const Sequelize = require('sequelize');

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
