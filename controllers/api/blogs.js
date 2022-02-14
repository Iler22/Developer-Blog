const { Blog } = require('../../models');
const { getPayloadWithValidFieldsOnly } = require('../../utils');

const createBlog = async (req, res) => {
  try {
    const payload = getPayloadWithValidFieldsOnly(
      ['title', 'contents'],
      req.body
    );

    if (Object.keys(payload).length !== 2) {
      console.log(`[ERROR]: Failed to create blog | Invalid fields`);
      return res.status(400).json({ error: 'Failed to create blog' });
    }

    await Blog.create({
      ...payload,
      user_id: req.session.user.id,
    });

    return res.json({ message: 'Successfully created blog' });
  } catch (error) {
    console.log(`[ERROR]: Failed to create blog | ${error.message}`);
    return res.status(500).json({ error: 'Failed to create blog' });
  }
};

const updateBlog = (req, res) => {
  res.send('updateBlog');
};
const deleteBlog = (req, res) => {
  res.send('deleteBlog');
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

module.exports = { createBlog, updateBlog, deleteBlog };
