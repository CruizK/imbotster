const router = require('express').Router();
const randomstring = require('randomstring');

let rooms = {};

router.post('/create', (req, res, next) => {
  let roomCode = randomstring.generate('7');

  while(rooms[roomCode]) {
    roomCode = randomstring.generate('7');
  }

  rooms.players = [1];

  res.json({roomCode, player: 1})
})

router.get('/join/:room', (req, res, next) => {
  let room = req.params.room;
  res.sendFile(__dirname + '/client/chat.html');
})

module.exports = router;
