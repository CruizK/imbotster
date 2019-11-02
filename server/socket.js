
module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log("There is a connection");

    socket.on('disconnect', () => {
      console.log("Disconnection");
    })
  })
}