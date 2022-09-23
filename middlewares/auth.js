module.exports = (req, res, next) => {
  if (!req.url.includes('/login') && !req.get('authorization')) {
    res.status(401).json({ message: 'Missing the required authorization token' })
  } else {
    next();
  }
}
