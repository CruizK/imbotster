

let users = 0;
module.exports = (io) => {
  io.on('connection', (socket) => {
    users++;
    socket.emit('setName', "Player" + users);
    console.log("There is a connection");
    socket.on('message', (msg) => {
      io.emit('message', msg.name + ": " + msg.msg);
    })
    socket.on('disconnect', () => {
      console.log("Disconnection");
      users--;
    })
  })
}