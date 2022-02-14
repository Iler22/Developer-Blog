const { Blog, User } = require('../../models');

const renderSingleBlogPage = async (req, res) => {
  const { loggedIn, user } = req.session;
  const { id } = req.params;
  const blogFromDB = await Blog.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ['username', 'id'],
      },
    ],
  });

  const blog = blogFromDB.get({ plain: true });

  const isMyBlog = loggedIn && user.id === blog.user.id;

  return res.render('singleBlog', { loggedIn, blog, isMyBlog });
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
};
