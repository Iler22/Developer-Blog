const { Router } = require('express');

const auth = require('../../middleware/auth');

const {
  createBlog,
  updateBlog,
  deleteBlog,
  addComment,
} = require('../../controllers/api/blogs');

const router = Router();

router.post('/:id', auth, addComment);
router.post('/', auth, createBlog);
router.put('/:id', auth, updateBlog);
router.delete('/:id', auth, deleteBlog);

module.exports = router;
