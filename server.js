const users = require('./db/users.json')
const config = require('./json-server.json')
const jsonServer = require('json-server')
const server = jsonServer.create(config)
const router = jsonServer.router('./db/generic.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use(jsonServer.rewriter({ '/api/*': '/$1' }))

server.use((req, res, next) => {
  if (!req.url.includes('/login') && !req.get('authorization')) {
    res.status(401).json({ message: 'Missing the required authorization token' })
  } else {
    next();
  }
})

server.post('/login', (req, res) => {
  try {
    const { username, password } = req.body
    const token = Buffer.from(`${username}:${password}`).toString('base64')
    const { password: dbPwd, ...user } = users[ token ];

    res.json({ ...user, token });
  } catch (error) {
    res.status(400).json({ message: 'Invalid username and/or password.'})
  }
})

// Use default router
server.use(router)
server.listen(config.port, () => {
  console.log('JSON Server is running on port', config.port)
})
