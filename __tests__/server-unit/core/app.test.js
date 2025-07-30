const request = require('supertest');
const app = require('../../../server/app.js');

describe('Express App', () => {
    it('GET / should return homepage JSON', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            title: 'Educational Quiz Game',
            description: 'Homepage'
        });
    });

    it('GET /user should respond (if router works)', async () => {
        const res = await request(app).get('/user');
        expect(res.statusCode).not.toBeGreaterThanOrEqual(400);
    });

    it('GET /game should respond (if router works)', async () => {
        const res = await request(app).get('/game');
        expect(res.statusCode).not.toBeGreaterThanOrEqual(400);
    });
});