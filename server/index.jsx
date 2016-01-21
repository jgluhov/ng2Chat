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
  faker = require('faker'),
  jwt = require('jsonwebtoken'),
  expressJwt = require('express-jwt');

let app = express();
let server = http.createServer(app);
let io = socket(server);

let user = {
  username: 'jgluhov',
  password: 'Mathemat1cs'
};

let jwtSecret = 'Mathemat1c1an';

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(expressJwt({ secret: jwtSecret }).unless({ path: ['/login']}));

app.get('/random-user', (req, res) => {
  res.json(faker.helpers.userCard());
});

app.post('/login', authenticate, (req, res) => {
  var token = jwt.sign({ username: user.username }, jwtSecret);
  res.json({ credentials: user, token: token });
});

app.get('/me', (req, res) => {
  res.json({ credentials: user })
});

io.on('connection', (socket) => {
  console.log('User connected');
});

app.listen(3000, () => {
  console.log(`Server is listening on: http://localhost:3000`);
});

function authenticate(req, res, next) {
  let body = req.body;

  if (!body.username || !body.password) {
    return res.status(400).json({ message: 'Must provide username or password'});
  }

  if (body.username !== user.username || body.password !== user.password) {
    return res.status(401).json({ message: 'Username or password incorrect'});
  }
  next();
}