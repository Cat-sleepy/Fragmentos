import request from 'supertest';
import app from '../app.js';

describe('Backend Tests', () => {

    // Teste 1: GET /health retorna 200
    test('GET /health retorna 200', async () => {
        const res = await request(app).get('/health');
        expect(res.status).toBe(200);
    });

    // Teste 2: POST /auth/login sem body retorna 400
    test('POST /auth/login sem body retorna 400', async () => {
        const res = await request(app).post('/auth/login').send({});
        expect(res.status).toBe(400);
    });

    // Teste 3: GET /fragments sem token retorna 401
    test('GET /fragments/mine sem token retorna 401', async () => {
        const res = await request(app).get('/fragments/mine');
        expect(res.status).toBe(401);
    });

});