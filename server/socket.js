
module.exports = (io) => {
  io.on('connection', (socket) => {

    require('./roomSocket')(io, socket);

    socket.on('disconnect', () => {
    })
  })
}