/**
 * Created by jgluhov on 19/01/16.
 */
import * as express from 'express';
import * as http from 'http';
import * as socket from 'socket.io';

let app = express();
let server = http.createServer(app);
let io = socket(server);

app.get('/', (req, res) => {
   res.sendStatus(200);
});

io.on('connection', (socket) => {
   console.log('User connected');
});

app.listen(3000, () => {
   console.log(`Server is listening on: http://localhost:3000`);
});