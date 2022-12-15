const nanoid = import('nanoid');

module.exports = (req, res, next) => {
  const endpoints = ['items', 'transactions'];

  if (endpoints.includes(req.url)) {
    req.body.id = nanoid();
  }

  next();
};
