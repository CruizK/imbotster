
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('answers').del()
    .then(function () {
      // Inserts seed entries
      return knex('answers').insert([
        {answerText: "I'm doing terrible", question_id: 1},
        {answerText: 'None of your business', question_id: 2},
        {answerText: 'pi', question_id: 3},
        {answerText: 'Blueberry', question_id: 4}
      ]);
    });
};
