const { Router } = require('express');

const router = Router();

const {
  renderDashboardPage,
  renderCreateBlogPage,
  renderSingleBlogPage,
  renderUserComment,
} = require('../../controllers/views/privateController');

router.get('/dashboard', renderDashboardPage);
router.get('/create-blog', renderCreateBlogPage);
router.get('/blogs/:id', renderSingleBlogPage);
// router.get('/blogs/:id', renderUserComment);

module.exports = router;
