const fs = require('fs');

/**
 * Generates individual SQL INSERT statements for each quiz question
 * @param {string} jsonPath - Path to the JSON file
 * @returns {string[]} Array of SQL INSERT statements
 */

function generateInsertStatements(jsonPath) {
    const data = fs.readFileSync(jsonPath, 'utf-8');
    const questions = JSON.parse(data);

    let values = '';

    const inserts = questions.map((q) => {
        values = values + '\n' + `('${q.question}', '${formatArray(q.options)}', '${q.answer}', '${q.topic}', '${q.subcategory}', '${q.type}', '${q.difficulty}', (SELECT game_id FROM games WHERE subject_id = (SELECT subject_id FROM subjects WHERE subject = '${q.subject}' LIMIT 1) LIMIT 1), (SELECT subject_id FROM subjects WHERE subject = '${q.subject}' LIMIT 1))` + ',';
    });

    values = values.substring(0, values.length - 1);

    return `INSERT INTO quiz_questions (question, options, answer, topic, subcategory, question_type, difficulty, game_id, subject_id) VALUES ${values};`;
};

function formatArray(arr) {
  if (!Array.isArray(arr)) {throw new Error('Input must be an array')};
  return JSON.stringify(arr);
}

module.exports = generateInsertStatements;