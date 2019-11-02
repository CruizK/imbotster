const db = require('../db');

module.exports.QuestionSchema = knex => {
  return knex.schema.createTable('questions', table => {
    table.increments(); // Primary Key id
    table.string('text').notNullable(); // string Actual Question Text
  })
}