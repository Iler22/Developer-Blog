const { Blog, User, Comment } = require('../../models');

const renderSingleBlogPage = async (req, res) => {
  const { loggedIn, user } = req.session;
  const { id } = req.params;
  const blogFromDB = await Blog.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ['username', 'id'],

        include: {
          model: Comment,
        },
      },
    ],
  });

  const blog = blogFromDB.get({ plain: true });
  const isMyBlog = loggedIn && user.id === blog.user.id;

  console.log(loggedIn, user, blog.user);
  console.log(isMyBlog);

  return res.render('singleBlog', { loggedIn, blog, isMyBlog });
};

const renderUserComment = async (req, res) => {
  const { loggedIn, user } = req.session;
  const { id } = req.params;
  const commentFromDB = await Comment.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ['username', 'id'],
      },
    ],
  });

  const comment = commentFromDB.get({ plain: true });

  const isMyComment = loggedIn && user.id === comment.user.id;

  return res.render('singleBlog', { loggedIn, comment, isMyComment });
};

const renderDashboardPage = async (req, res) => {
  const { loggedIn, user } = req.session;

  const blogsFromDB = await Blog.findAll({
    where: {
      user_id: req.session.user.id,
    },
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  });

  const blogs = blogsFromDB.map((blog) => blog.get({ plain: true }));

  return res.render('dashboard', { loggedIn, blogs, user });
};

const renderCreateBlogPage = (req, res) => {
  return res.render('createBlog');
};

module.exports = {
  renderSingleBlogPage,
  renderDashboardPage,
  renderCreateBlogPage,
  renderUserComment,
};
