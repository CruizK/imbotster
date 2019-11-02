
module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log("A User Has Joined Your Channel")

    require('./roomSocket')(socket);

    socket.on('disconnect', () => {
      console.log("A User has Left Your Channel");
    })
  })
}