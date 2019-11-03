const db = require('../db');

module.exports.AnswerSchema = knex => {
  return knex.schema.createTable('answers', table => {
    table.increments(); // Primary Key id
    table.string('answerText').notNullable(); // string Actual Question Text
    table.integer('question_id').unsigned().references('id').inTable('questions').onDelete('CASCADE');
  })
}

module.exports.GetAnswer = async (question_id) => {
  let count = await db('answers').where({question_id}).count('question_id');
  count = Object.values(count[0])[0];
  console.log('Answer Count: ' + count);
  let offset = Math.floor(Math.random() * count) - 1;
  console.log('Answer offset: ' + offset);
  if(offset < 0) offset = 0;
  
  const answer = await db('answers').select('*').where({question_id}).offset(offset).limit(1);
  console.log(answer);
  return answer[0];
}

