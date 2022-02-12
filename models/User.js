const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const connection = require('../config/connection');
const { hashPassword } = require('../hooks');

class User extends Model {
  checkPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8],
    },
  },
};

const options = {
  hooks: {
    beforeCreate: hashPassword,
  },
  sequelize: connection,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: 'user',
};

User.init(schema, options);

module.exports = User;
