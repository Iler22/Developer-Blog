const { getPayloadWithValidFieldsOnly } = require('../../utils');
const { User } = require('../../models');

const signUp = async (req, res) => {
  try {
    const payload = getPayloadWithValidFieldsOnly(
      ['username', 'password'],
      req.body
    );

    if (Object.keys(payload).length !== 2) {
      console.log(`[ERROR]: Failed to sign up | Invalid fields`);
      return res.status(400).json({ error: 'Failed to sign up' });
    }

    const user = await User.create(payload);

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = {
        id: user.get('id'),
        username: user.get('username'),
      };
      return res.json({ message: 'Successfully created user' });
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to sign up | ${error.message}`);
    return res.status(500).json({ error: 'Failed to sign up' });
  }
};

const login = async (req, res) => {
  try {
    const payload = getPayloadWithValidFieldsOnly(
      ['username', 'password'],
      req.body
    );

    if (Object.keys(payload).length !== 2) {
      console.log(`[ERROR]: Failed to sign up | Invalid fields`);
      return res.status(400).json({ error: 'Failed to login' });
    }

    const user = await User.findOne({
      where: {
        username: payload.username,
      },
    });

    if (!user) {
      console.log(`[ERROR]: Failed to login | User not found`);
      return res.status(401).json({ error: 'Failed to login' });
    }

    const isValidPassword = user.checkPassword(payload.password);

    if (!isValidPassword) {
      console.log(`[ERROR]: Failed to login | Invalid password`);
      return res.status(401).json({ error: 'Failed to login' });
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = {
        id: user.get('id'),
        username: user.get('username'),
      };
      return res.json({ message: 'Successfully logged in' });
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to login | ${error.message}`);
    return res.status(500).json({ error: 'Failed to login' });
  }
};

const logout = (req, res) => {
  req.session.destroy();

  return res.redirect('/login');
};

module.exports = { signUp, login, logout };
