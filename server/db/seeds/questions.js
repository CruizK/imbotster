
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('questions').del()
    .then(function () {
      // Inserts seed entries
      return knex('questions').insert([
        {id: 1, questionText: 'How are you?'},
        {id: 2, questionText: 'What is your name?'},
        {id: 3, questionText: 'What comes after 3 but before 5?'},
        {id: 4, questionText: 'What is your favorite color?'}
      ]);
    });
};
