const router = require('express').Router();
const randomstring = require('randomstring');
const roomHandler = require('../roomHandler')

router.post('/create', (req, res, next) => {
  let roomCode = randomstring.generate('7');

  while(rooms[roomCode]) {
    roomCode = randomstring.generate('7');
  }

  rooms.players = [1];

  res.json({roomCode, player: 1})
})

router.post('/search', (req, res, next) => {
  let rooms = roomHandler.getRooms();
  for(let i = 0; i < rooms.length; i++) {
    if(rooms[i].players < 5) {
      return res.json({code: rooms[i].code});
    }
  }

  roomHandler.addRoom({
    code: randomstring.generate('7'),
    players: 1,
    started: false,
  })

  res.json({code: rooms[rooms.length-1].code});
})


module.exports = router;
