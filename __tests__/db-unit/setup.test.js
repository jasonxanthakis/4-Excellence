const path = require('path');
const fs = require('fs');

jest.mock('fs');
jest.mock('path');
jest.mock('../../server/db/connect.js', () => ({
  query: jest.fn(),
  end: jest.fn()
}));
jest.mock('../../server/db/dump-questions.js', () => jest.fn());

const db = require("../../server/db/connect.js");
const setUpAll = require("../../server/db/setup.js");
const questions = require("../../server/db/dump-questions.js");

describe('Set up the database', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        fs.readFileSync.mockReturnValue('CREATE TABLE test;');
        db.query.mockResolvedValue({});
        questions.mockReturnValue(`INSERT INTO quiz_questions (question, options, answer, topic, subcategory, question_type, difficulty, game_id, subject_id) VALUES ('What is the name of the tapestry that tells the story of the Norman Conquest?', '["Bayeux Tapestry","Doomsday Book","Canterbury Tales","Wessex Chronicle"]', 'Bayeux Tapestry', 'History', 'Normans', 'multiple-choice', 'medium', (SELECT game_id FROM games WHERE subject_id = (SELECT subject_id FROM subjects WHERE subject = 'History' LIMIT 1) LIMIT 1), (SELECT subject_id FROM subjects WHERE subject = 'History' LIMIT 1)), ('Who was Queen Elizabeth''s Prime Minister of Britain during most of WWII?', '["Winston Churchill","Neville Chamberlain","Clement Attlee","Anthony Eden"]', 'Winston Churchill', 'History', 'World War II', 'multiple-choice', 'easy', (SELECT game_id FROM games WHERE subject_id = (SELECT subject_id FROM subjects WHERE subject = 'History' LIMIT 1) LIMIT 1), (SELECT subject_id FROM subjects WHERE subject = 'History' LIMIT 1)), ('Who was the daughter of Henry VIII and Anne Boleyn?', '["Elizabeth I","Mary I","Anne of Cleves","Catherine of Aragon"]', 'Elizabeth I', 'History', 'Tudors', 'multiple-choice', 'easy', (SELECT game_id FROM games WHERE subject_id = (SELECT subject_id FROM subjects WHERE subject = 'History' LIMIT 1) LIMIT 1), (SELECT subject_id FROM subjects WHERE subject = 'History' LIMIT 1)), ('Who was the Prime Minister of Britain during most of WWII?', '["Winston Churchill","Neville Chamberlain","Clement Attlee","Anthony Eden"]', 'Winston Churchill', 'History', 'World War II', 'multiple-choice', 'medium', (SELECT game_id FROM games WHERE subject_id = (SELECT subject_id FROM subjects WHERE subject = 'History' LIMIT 1) LIMIT 1), (SELECT subject_id FROM subjects WHERE subject = 'History' LIMIT 1));`);
    });

    it('Sets up and seeds the database', async () => {
        const fakeDir = '/test/path';

        await setUpAll(fakeDir);

        expect(fs.readFileSync).toHaveBeenCalledWith('D:\\repos\\LaFosseAcademy\\Alpha\\4-excellence\\server\\db/setup.sql');
        expect(db.query).toHaveBeenCalledWith('CREATE TABLE test;');
        expect(db.query).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO quiz_questions'));
        expect(db.end).toHaveBeenCalled();
    });

    it('Logs error if any of the queries fail', async () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        fs.readFileSync.mockReturnValue('BAD SQL');
        db.query.mockRejectedValue(new Error('Query failed'));

        const fakeDir = '/test/path';

        await setUpAll(fakeDir);

        expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
        consoleSpy.mockRestore();
    });
});