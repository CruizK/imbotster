const roomHandler = require('./roomHandler');
const Questions = require('./models/Question');
const Answers = require('./models/Answers');

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

  socket.on('selectQuestion', async (code, question) => {
    console.log("Question", question, code);
    io.to(code).emit('questionSelected', question);
    let answer = await Answers.GetAnswer(question.id);
    console.log("BOT ANSWER: " + answer);
    setTimeout(()=> {
      let room = roomHandler.getRoom(code);
      let name = room.players[0].name;
      let answerCount = roomHandler.addAnswer(code)
      io.to(code).emit('answerSubmitted', name + ": " + answer.answerText, answerCount);
      console.log("" + answerCount + "/5")
      if(answerCount == 4) {
        roomHandler.nextRound(code);
        io.to(code).emit('nextRound', 'Player ' + room.currentPlayer);
      }
    }, 1000 * 5)
    // Also do bot stuff
  })

  socket.on('answer', (code, user, answer, question) => {
    
    let answerCount = roomHandler.addAnswer(code);
    console.log("" + answerCount + "/5")
    io.to(code).emit('answerSubmitted', user + ": " + answer, answerCount);
    if(answerCount == 4) {
      let room = roomHandler.getRoom(code);
      roomHandler.nextRound(code);
      io.to(code).emit('nextRound', 'Player ' + room.currentPlayer);
    }
    // Log this answer for bot magic;
  })
}