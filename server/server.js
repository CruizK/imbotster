const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT  = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + "/client/index.html");
})

const roomRoutes = require('./routes/room');

app.use('/room', roomRoutes);

require('./socket')(io);

server.listen(PORT, () => {
  console.log("Listening to server on port " + PORT);
})
