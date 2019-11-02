let rooms = [];

module.exports.getRooms = () => {
  return rooms;
}

module.exports.addRoom = (data) => {
  rooms.push(data);
}
