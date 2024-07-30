import { Schema, model } from 'mongoose';

const orderItemSchema = new Schema({
    burrito: { type: Schema.Types.ObjectId, ref: 'Burrito', required: true },
    quantity: { type: Number, required: true }
});

export const OrderItem = model('OrderItem', orderItemSchema);
