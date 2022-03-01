const Blog = require('./Blog');
const User = require('./User');
const Comment = require('./Comment');

Blog.belongsTo(User, {
  foreignKey: 'user_id',
});
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { Blog, User, Comment };
