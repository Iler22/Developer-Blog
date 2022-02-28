const router = require('express').Router();
const { Comment } = require('../../models');

// get all comments
router.get('/', async (req, res) => {
  try {
    const comments = (await Comment.findAll()).map((comment) =>
      comment.get({ plain: true })
    );
    res.json(comments);
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

// add a comment
router.post('/', async (req, res) => {
  try {
    const addComment = await Comment.create({
      user_id: req.params.user.id,
      blogs_id: req.params.blogs_id,
      contents: req.body.contents,
    });
    res.json(addComment);
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

// delete a comment
router.delete('/:id', async (req, res) => {
  try {
    const deleteComment = await Comment.destroy(req.body);
    res.json(deleteComment);
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

module.exports = router;
