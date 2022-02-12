const users = require('./users');
const blogs = require('./blogs');
const User = require('../models/User');
const Blog = require('../models/Blog');
const connection = require('../config/connection');

const seedAll = async () => {
  try {
    await connection.sync({ force: true });

    console.log('DB sync successful');

    await User.bulkCreate(users);

    console.log('Users seeded successfully');

    await Blog.bulkCreate(blogs);

    console.log('blogs seeded successfully');
  } catch (error) {
    console.log(`[ERROR] Seed failed | ${error.message}`);
  }

  process.exit(0);
};

seedAll();
