const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

const port = 3001;

server.use(jsonServer.bodyParser);

server.use(router);

server.listen(port, () => {
  console.log('JSON Server is running');
});

// Export the Server API
module.exports = server;
