const { Model, DataTypes } = require('sequelize');
const connection = require('../config/connection');

class Comment extends Model {}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  contents: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  blog_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'blog',
      key: 'id',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id',
    },
  },
};

const options = {
  sequelize: connection,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: 'comment',
};

Comment.init(schema, options);

module.exports = Comment;
