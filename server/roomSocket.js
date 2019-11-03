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
        console.log(roomHandler.startRoom(roomCode));
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
      if(answerCount == room.players.length - 1) {
        await nextRound(code, io);
      }
    }, 1000 * 5)
    // Also do bot stuff
  })

  socket.on('answer', async (code, user, answer, question) => {
    
    let answerCount = roomHandler.addAnswer(code);
    console.log("" + answerCount + "/4")
    io.to(code).emit('answerSubmitted', user + ": " + answer, answerCount);
    if(answerCount == roomHandler.getRoom(code).players.length-1) {
      await nextRound(code, io);
    }
    // Log this answer for bot magic;
  })

  socket.on('voteOff', async(code, playerVote) => {
    roomHandler.voteOff(code, playerVote);
    let room = roomHandler.getRoom(code);
    console.log("VOTED: " + room.voteCount)
    if(room.voteCount == room.players.length-1) {
      let max = 0;
      let name;
      console.log(room.votes);
      for(let vote in room.votes) {
        if(room.votes[vote] > max) {
          max = room.votes[vote];
          name = vote;
        }
      } 
      roomHandler.removePlayer(code, name);
      io.to(code).emit('votedOff', name);
      await nextRound(code, io);
    }
  })
}


async function nextRound(code, io) {
  let room = roomHandler.getRoom(code);
  roomHandler.nextRound(code);
  console.log(room.players.length);
  if(room.currentPlayer == room.players.length - 1) {
    return io.to(code).emit('voteOff');
  }
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