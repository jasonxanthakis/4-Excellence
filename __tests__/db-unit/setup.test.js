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
    });

    it('Runs setup.sql and inserts questions from each quiz file', async () => {
        // Mock fs and db
        fs.readFileSync.mockReturnValue('CREATE TABLE test;');
        db.query.mockResolvedValue({});

        // Mock questions() to return some SQL
        questions.mockImplementation((filepath) => `INSERT INTO questions FROM ${filepath}`);

        // Mock quizzes
        const mockFiles = [
            'ks3_history_questions.json',
            'ks3_geography_questions.json'
        ];

        // Set up path.join to return correct mock paths
        path.join.mockImplementation((...args) => args.join('/'));

        await setUpAll();

        // Assert SQL setup ran
        expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining('setup.sql'));
        expect(db.query).toHaveBeenCalledWith('CREATE TABLE test;');

        // Assert each question file ran through questions() and db.query
        mockFiles.forEach(file => {
            const expectedPath = ['..', '..', 'server', 'db', 'questions', file].join('/');
            expect(questions).toHaveBeenCalledWith(expectedPath);
            expect(db.query).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO questions FROM'));
        });

        // Assert db.end() called
        expect(db.end).toHaveBeenCalled();
    });
});