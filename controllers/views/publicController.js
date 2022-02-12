const renderSignUpPage = (req, res) => {
  return res.render('signUp');
};

const renderLoginPage = (req, res) => {
  return res.render('login');
};

const renderHomePage = (req, res) => {
  return res.render('home');
};

module.exports = {
  renderSignUpPage,
  renderLoginPage,
  renderHomePage,
};
