const nanoid = import('nanoid');

module.exports = (req, res, next) => {
  const endpoints = ['guests', 'units', 'residents', 'transactions'];

  if (endpoints.includes(req.url)) {
    req.body.id = nanoid();
  }

  next();
};
