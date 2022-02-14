const { Blog, User } = require('../../models');

const renderSignUpPage = (req, res) => {
  if (!req.session.loggedIn) {
    return res.render('signUp');
  }

  return res.redirect('/');
};

const renderLoginPage = (req, res) => {
  if (!req.session.loggedIn) {
    return res.render('login');
  }

  return res.redirect('/');
};

const renderHomePage = async (req, res) => {
  const { loggedIn } = req.session;
  const blogsFromDB = await Blog.findAll({
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  });

  const blogs = blogsFromDB.map((blog) => blog.get({ plain: true }));

  return res.render('home', { loggedIn, blogs });
};

module.exports = {
  renderSignUpPage,
  renderLoginPage,
  renderHomePage,
};
