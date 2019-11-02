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
      return rooms[i]
    }
  }
}

module.exports.joinRoom = (roomCode) => {
  for(let i = 0; i < rooms.length; i++) {
    if(rooms[i].code == roomCode) {
      rooms[i].players++;
      return rooms[i];
    }
  }
}