const { Router } = require('express');
const {
  renderSingleBlogPage,
  renderDashboardPage,
  renderCreateBlogPage,
} = require('../../controllers/views/privateController');

const router = Router();

router.get('/blog/:id', renderSingleBlogPage);
router.get('/dashboard', renderDashboardPage);
router.get('/create-blog', renderCreateBlogPage);

module.exports = router;
