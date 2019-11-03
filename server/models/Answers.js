const db = require('../db');

module.exports.AnswerSchema = knex => {
  return knex.schema.createTable('answers', table => {
    table.increments(); // Primary Key id
    table.string('answerText').notNullable(); // string Actual Question Text
    table.integer('question_id').unsigned().references('id').inTable('questions').onDelete('CASCADE');
  })
}