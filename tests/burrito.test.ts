import request from 'supertest';
import app from '../src/index';
import mongoose from 'mongoose';

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI!, {});
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('Burrito API', () => {
    it('should create a new burrito', async () => {
        const response = await request(app)
            .post('/api/burritos')
            .send({
                name: 'Chicken Burrito',
                size: 'regular',
                price: 3,
                options: ['black olives', 'rice', 'sour cream']
            })
            .expect(201);

        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe('Chicken Burrito');
    });

    it('should fetch a list of burritos', async () => {
        const response = await request(app).get('/api/burritos').expect(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});
