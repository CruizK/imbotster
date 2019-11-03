const router = require('express').Router();
const randomstring = require('randomstring');
const roomHandler = require('../roomHandler')
const path = require('path');

router.get('/join/:code', (req, res, next) => {
  let code = req.params.code;
  res.render('chat.ejs', {code});
})

router.get('/join/:code/fail', (req, res, next) => {
  res.render('fail.ejs');
})

roomHandler.addRoom({
  code: 'test',
  players: [{
    name: '',
    isBot: true
  }],
  answers: 0,
  votes: {},
  voteCount: 0,
  currentPlayer: 1,
  started: false
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
    players: [{
      name: '',
      isBot: true
    }],
    answers: 0,
    votes: {},
    voteCount: 0,
    currentPlayer: 1,
    started: false,
  })

  res.json({code: rooms[rooms.length-1].code});
})


module.exports = router;
