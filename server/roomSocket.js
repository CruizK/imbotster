const roomHandler = require('./roomHandler');

module.exports = (socket) => {

  socket.on('joinRoom', (roomCode) => {
    socket.join(roomCode, () => {
      console.log(roomHandler.joinRoom(roomCode));
      if(roomHandler.getRoom(roomCode).players == 5) {
        
      }
    });
  })
}