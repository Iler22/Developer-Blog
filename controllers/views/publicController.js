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

const renderHomePage = (req, res) => {
  const { loggedIn } = req.session;
  return res.render('home', { loggedIn });
};

module.exports = {
  renderSignUpPage,
  renderLoginPage,
  renderHomePage,
};
