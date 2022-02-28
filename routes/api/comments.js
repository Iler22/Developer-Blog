const { Router } = require('express');
const comments = require('../../controllers/api/comments');

const router = Router();

router.post('/comments', comments);

module.exports = router;
