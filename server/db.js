const config = require('./knexfile')
const knex = require('knex');

const instance = knex(config)

module.exports = instance;