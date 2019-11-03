const AnswerSchema = require('../../models/Answers').AnswerSchema

exports.up = function(knex) {
    return Promise.all([
        AnswerSchema(knex)
    ])
  };
  
  exports.down = function(knex) {
    return Promise.all([
      knex.schema.dropTable('answers')
    ])
  };