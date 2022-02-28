const { Blog } = require('../../models');
const { Comment } = require('../../models');
const { getPayloadWithValidFieldsOnly } = require('../../utils');

// const isValid = (payload) => {
//   return true;
// };

const addComment = async (req, res) => {
  try {
    const payload = getPayloadWithValidFieldsOnly('contents', req.body);

    console.log(req.body);
    if (Object.keys(payload).length !== 1) {
      console.log(`[ERROR]: Failed to add comment | Invalid fields`);
      return res.status(400).json({ error: 'Failed to add comment' });
    }

    await Comment.create({
      ...payload,
      dataValues: {
        comment: {
          user_id: req.session.user_id,
          blog_id: req.body.blog_id,
          contents: req.body.contents,
        },
      },
    });

    return res.json({ message: 'Successfully added comment' });
  } catch (error) {
    console.log(`[ERROR]: Failed to add comment | ${error.message}`);
    return res.status(500).json({ error: 'Failed to add comment' });
  }
};

const createBlog = async (req, res) => {
  try {
    const payload = getPayloadWithValidFieldsOnly(
      ['title', 'contents'],
      req.body
    );

    console.log(req.body);

    if (Object.keys(payload).length !== 2) {
      console.log(`[ERROR]: Failed to create blog | Invalid fields`);
      return res.status(400).json({ error: 'Failed to create blog' });
    }

    await Blog.create({
      ...payload,
      user_id: req.session.user_id,
      username: req.session.user.username,
    });

    return res.json({ message: 'Successfully added comment' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create blog' });
  }
};

const updateBlog = async (req, res) => {
  try {
    const payload = req.body;

    if (isValid(payload)) {
      return res.json({ success: true });
    }

    return res
      .status(400)
      .json({ success: false, error: 'Please provide a valid payload' });
  } catch (error) {
    console.log(`[ERROR]: Failed to update blog | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json({ message: 'Successfully deleted blog' });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete blog | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { addComment, createBlog, updateBlog, deleteBlog };
