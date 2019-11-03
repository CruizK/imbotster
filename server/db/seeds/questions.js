const fs = require('fs');


exports.seed = function(knex) {
  // Deletes ALL existing entries

  let buffer = fs.readFileSync(__dirname + '/questions.txt', {encoding: 'utf-8'})
  let text = buffer.split('\n');
  let questions = {};
  let questionCount = 0;
  for(let i = 0; i < text.length; i++) {
    if(text[i].startsWith('*')) {
      questionCount++;
      questions[questionCount] = {
        text: text[i].substr(1),
        answers: []
      }
    }
    else {
      questions[questionCount].answers.push(text[i]);
    }
  }

  return knex('questions').del()
    .then(async function () {
      // Inserts seed entries
      let qs = []
      let ans = []
      for(let q in questions) {
        qs.push({id: q, questionText: questions[q].text});
        for(let i = 0; i < questions[q].answers.length; i++) {
          ans.push({question_id: q, answerText: questions[q].answers[i]});
        }
      }
      
      await knex('questions').insert(qs);
      await knex('answers').insert(ans.slice(0, 400));
      await knex('answers').insert(ans.slice(400, 700));
      return knex('answers').insert(ans.slice(700));
    });
};
