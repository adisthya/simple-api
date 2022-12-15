const config = require('./json-server.json');
const jsonServer = require('json-server');
const auth = require('./middlewares/auth');
const login = require('./middlewares/login');
const generator = require('./middlewares/generator');
const delay = require('./middlewares/delay');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const database = jsonServer.router('./db/generic.json');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Use default router
// server.use(router);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use(jsonServer.rewriter({ '/api/*': '/$1' }));

server.use(delay);
server.use(auth);
server.use(login);
server.use(generator);
server.use(database);

server.listen(config.port, () => {
  console.log('JSON Server is running on port', config.port);
});
