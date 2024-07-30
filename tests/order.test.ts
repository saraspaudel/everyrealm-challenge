import request from 'supertest';
import app from '../src/index';
import mongoose from 'mongoose';
import { Burrito } from '../src/models/Burrito';

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI!, {});

    // Create a burrito to use in order tests
    await Burrito.create({
        name: 'Chicken Burrito',
        size: 'regular',
        price: 3,
        options: ['black olives', 'rice', 'sour cream']
    });
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('Order API', () => {
    let burritoId: string;

    beforeAll(async () => {
        const burrito = await Burrito.findOne({ name: 'Chicken Burrito' });
        burritoId = burrito?._id.toString()!;
    });

    it('should create a new order', async () => {
        const response = await request(app)
            .post('/api/orders')
            .send({
                items: [
                    { burritoId, quantity: 2 }
                ]
            })
            .expect(201);

        expect(response.body).toHaveProperty('_id');
        expect(response.body.items).toBeInstanceOf(Array);
    });

    it('should fetch a list of orders', async () => {
        const response = await request(app).get('/api/orders').expect(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0]).toHaveProperty('items');
        expect(response.body[0].items).toBeInstanceOf(Array);
        expect(response.body[0].items[0]).toHaveProperty('burrito');
        expect(response.body[0].items[0].burrito).toHaveProperty('name');
    });

    it('should fetch an order by ID', async () => {
        const orders = await request(app).get('/api/orders').expect(200);
        const orderId = orders.body[0]._id;

        const response = await request(app).get(`/api/orders/${orderId}`).expect(200);
        expect(response.body).toHaveProperty('_id', orderId);
        expect(response.body.items).toBeInstanceOf(Array);
        expect(response.body.items[0]).toHaveProperty('burrito');
        expect(response.body.items[0].burrito).toHaveProperty('name');
    });
});
