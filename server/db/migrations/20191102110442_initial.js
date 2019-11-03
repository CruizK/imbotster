const QuestionSchema = require('../../models/Question').QuestionSchema

exports.up = function(knex) {
  return Promise.all([
    QuestionSchema(knex)
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('questions')
  ])
};
