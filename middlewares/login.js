const users = require('../db/users.json');

module.exports = (req, res, next) => {
  if (req.url.includes('/login') && req.method === 'POST') {
    try {
      const { username, password } = req.body;
      const token = Buffer.from(`${username}:${password}`).toString('base64');
      const { password: dbPwd, ...user } = users[token];

      res.json({ ...user, token });
    } catch (error) {
      res.status(400).json({ message: 'Invalid username and/or password.' });
    }
  } else {
    next();
  }
};
