const renderSingleBlogPage = (req, res) => {
  return res.render('singleBlog');
};

const renderDashboardPage = (req, res) => {
  return res.render('dashboard');
};

const renderCreateBlogPage = (req, res) => {
  return res.render('createBlog');
};

module.exports = {
  renderSingleBlogPage,
  renderDashboardPage,
  renderCreateBlogPage,
};
