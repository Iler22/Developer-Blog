const { Blog } = require('../../models');
const { Comment } = require('../../models');
const { getPayloadWithValidFieldsOnly } = require('../../utils');

// const isValid = (payload) => {
//   return true;
// };

const addComment = async (req, res) => {
  try {
    const payload = getPayloadWithValidFieldsOnly(['contents'], req.body);

    console.log(req.body);
    if (Object.keys(payload).length !== 1) {
      console.log(`[ERROR]: Failed to add comment | Invalid fields`);
      return res.status(400).json({ error: 'Failed to add comment' });
    }

    await Comment.create({
      ...payload,
      user_id: req.session.user.id,
      username: req.session.user.username,
    });

    return res.json({ message: 'Successfully added comment' });
  } catch (error) {
    console.log(`[ERROR]: Failed to added comment | ${error.message}`);
    return res.status(500).json({ error: 'Failed to added comment' });
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
      user_id: req.session.user.id,
      username: req.session.user.username,
    });

    return res.json({ message: 'Successfully added comment' });
  } catch (error) {
    console.log(`[ERROR]: Failed to create blog | ${error.message}`);
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

// const { Blog } = require('../../models');

// get all blogs
// router.get('/', async (req, res) => {
//   try {
//     const blogs = (await Blog.findAll()).map((blog) =>
//       blog.get({ plain: true })
//     );
//     res.render('blogs', { blogs });
//   } catch (err) {
//     res.sendStatus(500).send(err);
//   }
// });

// // get single blog
// router.get('/:id', async (req, res) => {
//   try {
//     const blog = (await Blog.findByPk(req.params.id)).get({ plain: true });
//     res.render('single-blog', { blog });
//   } catch (err) {
//     res.sendStatus(500).send(err);
//   }
// });

// // add a blog
// router.post('/', async (req, res) => {
//   try {
//     const createBlog = await Blog.create(req.body);
//     res.json(createBlog);
//   } catch (err) {
//     res.sendStatus(500).send(err);
//   }
// });

// // update a blog
// router.put('/:id', async (req, res) => {
//   try {
//     const updateBlog = await Blog.update(req.body);
//     res.json(updateBlog);
//   } catch (err) {
//     res.sendStatus(500).send(err);
//   }
// });

// // delete a blog
// router.delete('/:id', async (req, res) => {
//   try {
//     const deleteBlog = await Blog.destroy(req.body);
//     res.json(deleteBlog);
//   } catch (err) {
//     res.sendStatus(500).send(err);
//   }
// });

module.exports = { addComment, createBlog, updateBlog, deleteBlog };
