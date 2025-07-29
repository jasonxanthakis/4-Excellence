const fs = require('fs');
const path = require('path');

let filepath = path.join(__dirname, '..', '..', 'server', 'db', 'dump-questions.js');
const questions = require(filepath);

test('Question dumper should return the correct SQL statement', async () => {
    filepath = path.join(__dirname, '..', '..', 'server', 'db', 'questions', 'test.json');
    const query = await questions(filepath);
    
    const expected = `INSERT INTO quiz_questions (question, options, answer, topic, subcategory, question_type, difficulty, game_id, subject_id) VALUES ('What is the name of the tapestry that tells the story of the Norman Conquest?', '["Bayeux Tapestry","Doomsday Book","Canterbury Tales","Wessex Chronicle"]', 'Bayeux Tapestry', 'History', 'Normans', 'multiple-choice', 'medium', (SELECT game_id FROM games WHERE subject_id = (SELECT subject_id FROM subjects WHERE subject = 'History' LIMIT 1) LIMIT 1), (SELECT subject_id FROM subjects WHERE subject = 'History' LIMIT 1)), ('Who was the Prime Minister of Britain during most of WWII?', '["Winston Churchill","Neville Chamberlain","Clement Attlee","Anthony Eden"]', 'Winston Churchill', 'History', 'World War II', 'multiple-choice', 'easy', (SELECT game_id FROM games WHERE subject_id = (SELECT subject_id FROM subjects WHERE subject = 'History' LIMIT 1) LIMIT 1), (SELECT subject_id FROM subjects WHERE subject = 'History' LIMIT 1)), ('Who was the daughter of Henry VIII and Anne Boleyn?', '["Elizabeth I","Mary I","Anne of Cleves","Catherine of Aragon"]', 'Elizabeth I', 'History', 'Tudors', 'multiple-choice', 'easy', (SELECT game_id FROM games WHERE subject_id = (SELECT subject_id FROM subjects WHERE subject = 'History' LIMIT 1) LIMIT 1), (SELECT subject_id FROM subjects WHERE subject = 'History' LIMIT 1)), ('Who was the Prime Minister of Britain during most of WWII?', '["Winston Churchill","Neville Chamberlain","Clement Attlee","Anthony Eden"]', 'Winston Churchill', 'History', 'World War II', 'multiple-choice', 'medium', (SELECT game_id FROM games WHERE subject_id = (SELECT subject_id FROM subjects WHERE subject = 'History' LIMIT 1) LIMIT 1), (SELECT subject_id FROM subjects WHERE subject = 'History' LIMIT 1));`
    expect(query).toBe(expected);
});

const db = require("../../server/db/connect.js");