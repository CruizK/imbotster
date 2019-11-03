const shuffle = require('shuffle-array');
let rooms = [];

module.exports.getRooms = () => {
  return rooms;
}

module.exports.getRoom = (roomCode) => {
  for(let i = 0; i < rooms.length; i++) {
    if(rooms[i].code == roomCode) {
      return rooms[i];
    }
  }
}

module.exports.addRoom = (data) => {
  rooms.push(data);
}

module.exports.startRoom = (roomCode) => {
  for(let i = 0; i < rooms.length; i++) {
    if(rooms[i].code == roomCode) {
      rooms[i].started = true;
      let arr = shuffle([5,4,3,2,1]);
      for(let p = 0; p < rooms[i].players.length; p++) {
        rooms[i].players[p].name = "Player " + arr[p];
        console.log('pepga');
      }
      return rooms[i];
    }
  }
}

module.exports.joinRoom = (roomCode, socket) => {
  for(let i = 0; i < rooms.length; i++) {
    if(rooms[i].code == roomCode) {
      rooms[i].players.push({
        name: '',
        isBot: false
      })
      return rooms[i];
    }
  }
}

module.exports.addAnswer = (roomCode, question, answer) => {
  for(let i = 0; io < rooms.length; i++) {
    if(rooms[i].code == roomCode) {
      rooms[i].answers++;
    }
  }
}

module.exports.nextRound = (roomCode) => {
  for(let i = 0; i < rooms.length; i++) {
    if(rooms[i].code == roomCode) {
      rooms[i].answers = 0;
    }
  }
}