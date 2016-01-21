/**
 * Created by jgluhov on 19/01/16.
 */
'use strict';

let express = require('express'),
  http = require('http'),
  socket = require('socket.io'),
  logger = require('morgan'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  faker = require('faker');

let app = express();
let server = http.createServer(app);
let io = socket(server);

let user = {
  username: 'jgluhov',
  password: 'Mathemat1cs'
};

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());

app.get('/random-user', (req, res) => {
  res.json(faker.helpers.userCard());
});

app.post('/login', (req, res) => {
  console.dir(req.body);
  res.sendStatus(200);
});

io.on('connection', (socket) => {
  console.log('User connected');
});

app.listen(3000, () => {
  console.log(`Server is listening on: http://localhost:3000`);
});

function authenticate(req, res, next) {
  let body = req.body;
  // TODO: Need to get req body
  console.log(req.body.json)

  if (!body.username || !body.password) {
    return res.status(400).end('Must provide username or password');
  }

  if (body.username !== user.username || body.password !== user.password) {
    return res.status(401).end('Username or password incorrect')
  }
  next();
}