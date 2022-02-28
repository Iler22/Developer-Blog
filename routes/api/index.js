const { Router } = require('express');

const users = require('./users');
const blogs = require('./blogs');
const comments = require('./comments');

const router = Router();

router.use('/users', users);
router.use('/blogs', blogs);
router.use('/comments', comments);

module.exports = router;
