const { Router } = require('express');

const router = Router();

const {
  renderSignUpPage,
  renderLoginPage,
  renderHomePage,
} = require('../../controllers/views/publicController');

router.get('/sign-up', renderSignUpPage);
router.get('/login', renderLoginPage);
router.get('/', renderHomePage);

module.exports = router;
