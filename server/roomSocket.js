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
    socket.join(roomCode, async () => {
      console.log(roomHandler.joinRoom(roomCode, socket));
      socket.emit('joinedRoom', room.players.length-1);
      if(room.players.length == 5) {
        roomHandler.startRoom(roomCode);
        io.to(roomCode).emit('start', room.players);
        if(room.players[0].name == 'Player 1') {
          const questions = await Questions.GetQuestions();
          let question = questions[Math.floor(Math.random() * questions.length)];
          setTimeout(() => {
            io.to(roomCode).emit('questionSelected', question);
          }, 1000 * 5)
        }
      }
    });
  })

  socket.on('getQuestions', async () => {
    const questions = await Questions.GetQuestions();
    socket.emit('gotQuestions', questions);
  })

  socket.on('selectQuestion', async (code, question) => {
    io.to(code).emit('questionSelected', question);
    let answer = await Answers.GetAnswer(question.id);
    console.log("BOT ANSWER: " + answer.answerText);
    setTimeout(async ()=> {
      let room = roomHandler.getRoom(code);
      let name = room.players[0].name;
      let answerCount = roomHandler.addAnswer(code)
      io.to(code).emit('answerSubmitted', name + ": " + answer.answerText, answerCount);
      console.log("" + answerCount + "/4")
      if(answerCount == 4) {
        await nextRound(code, io);
      }
    }, 1000 * 5)
    // Also do bot stuff
  })

  socket.on('answer', async (code, user, answer, question) => {
    
    let answerCount = roomHandler.addAnswer(code);
    console.log("" + answerCount + "/4")
    io.to(code).emit('answerSubmitted', user + ": " + answer, answerCount);
    if(answerCount == 4) {
      await nextRound(code, io);
    }
    // Log this answer for bot magic;
  })
}


async function nextRound(code, io) {
  let room = roomHandler.getRoom(code);
  roomHandler.nextRound(code);
  io.to(code).emit('nextRound', 'Player ' + room.currentPlayer);

  //The bot is now the current Player
  if(room.players[0].name == 'Player ' + room.currentPlayer) {
    const questions = await Questions.GetQuestions();
    let question = questions[Math.floor(Math.random() * questions.length)];
    setTimeout(() => {
      io.to(code).emit('questionSelected', question);
    }, 1000 * 5)
  }
}