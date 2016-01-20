/**
 * Created by jgluhov on 19/01/16.
 */
'use strict';

let express = require('express'),
   http = require('http'),
   socket = require('socket.io'),
   faker = require('faker');

let app = express();
let server = http.createServer(app);
let io = socket(server);

app.get('/random-user', (req, res) => {
   res.json(faker.helpers.userCard());
});

app.get('/', (req, res) => {
   res.sendStatus(200);
});

io.on('connection', (socket) => {
   console.log('User connected');
});

app.listen(3000, () => {
   console.log(`Server is listening on: http://localhost:3000`);
});