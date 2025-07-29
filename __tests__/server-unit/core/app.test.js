const request = require('supertest');
const app = require('../../../server/app.js');
const logger = require('../../../server/middleware/logger.js');

describe('Logger Middleware', () => {
    const mockReq = {
        method: 'GET',
        hostname: 'localhost',
        path: '/test',
        time: '2025-07-29T16:13:00Z'
    };

    const mockRes = {};
    const mockNext = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    it('should log the method, hostname, path and time', () => {
        logger(mockReq, mockRes, mockNext);

        expect(console.log).toHaveBeenCalledWith(
            mockReq.method,
            mockReq.hostname,
            mockReq.path,
            mockReq.time
        );
    });

    it('should call next()', () => {
        logger(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });
});

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