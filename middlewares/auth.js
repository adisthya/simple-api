const users = require('../db/users.json');

module.exports = (req, res, next) => {
  let token = req.get('authorization');
  token = token ? token.replace('Bearer ', '') : token;

  console.log('auth', token, users[token]);

  if (!req.url.includes('/login') && !token) {
    res.status(401).json({ message: 'Missing the required authorization token.' });
  } else if (!req.url.includes('/login') && token && !users[token]) {
    res.status(401).json({ message: 'Token authorization is not valid.' });
  } else {
    next();
  }
};
