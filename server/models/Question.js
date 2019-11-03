const db = require('../db');

module.exports.QuestionSchema = knex => {
  return knex.schema.createTable('questions', table => {
    table.increments(); // Primary Key id
    table.string('questionText').notNullable(); // string Actual Question Text
  })
}

module.exports.GetQuestions = async () => {
  let count = await db('questions').count('id');
  count = Object.values(count[0])[0];
  console.log(count);
  let offset = Math.floor(Math.random() * count) - 4;
  console.log(offset);
  if(offset < 0) offset = 0;

  const questions = await db('questions').select('*').offset(offset).limit(4);
  return questions;
}