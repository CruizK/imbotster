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

module.exports.addAnswer = (roomCode) => {
  for(let i = 0; i < rooms.length; i++) {
    if(rooms[i].code == roomCode) {
      return ++rooms[i].answers;
    }
  }
}

module.exports.nextRound = (roomCode) => {
  for(let i = 0; i < rooms.length; i++) {
    if(rooms[i].code == roomCode) {
      console.log("NEXT ROUND");
      rooms[i].answers = 0;
      rooms[i].currentPlayer++;
      if(rooms[i].currentPlayer > 5) {
        rooms[i].currentPlayer = 1;
      }
    }
  }
}

module.exports.voteOff = (code, vote) => {
  for(let i = 0; i < rooms.length; i++) {
    if(rooms[i].code == code) {
      rooms[i].votes[vote] ? rooms[i].votes[vote]++ : rooms[i].votes[vote] = 1;
      rooms[i].voteCount++;
    }
  }
}

module.exports.removePlayer = (code, player) => {
  for(let i = 0; i < rooms.length; i++) {
    if(rooms[i].code == code) {
      for(let p = 0; p < rooms[i].players.length; p++) {
        if(rooms[i].players[p].name == player) {
          rooms[i].players.splice(p, 1);
          break;
        }
      }
    }
  }
}