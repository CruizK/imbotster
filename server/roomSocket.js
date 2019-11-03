const roomHandler = require('./roomHandler');
const Questions = require('./models/Question');

module.exports = (io, socket) => {

  socket.on('joinRoom', (roomCode) => {
    let room = roomHandler.getRoom(roomCode);
    if(!room) {
      return socket.emit('joinRoom:failed', "Room("+roomCode+") does not exist")
    }
    if(room.started) {
      return socket.emit('joinRoom:failed', "Room("+roomCode+") Already Started")
    }
    socket.join(roomCode, () => {
      console.log(roomHandler.joinRoom(roomCode, socket));
      socket.emit('joinedRoom', room.players.length-1);
      if(room.players.length == 5) {
        console.log(roomHandler.startRoom(roomCode));
        io.to(roomCode).emit('start', room.players);
      }
    });
  })

  socket.on('getQuestions', async () => {
    const questions = await Questions.GetQuestions();
    console.log(questions);
    socket.emit('gotQuestions', questions);
  })

  socket.on('selectQuestion', (code, question) => {
    console.log("Question", question, code);
    io.to(code).emit('questionSelected', question);


    // Also do bot stuff
  })

  socket.on('answer', (code, user, answer, question) => {
    roomHandler.incAnswers

    io.to(code).emit('answerSubmitted', user + ": " + answer);

    // Log this answer for bot magic;
  })
}