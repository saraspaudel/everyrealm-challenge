import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    items: [{ type: Schema.Types.ObjectId, ref: 'OrderItem', required: true }],
    totalCost: { type: Number, required: true }
});

export const Order = model('Order', orderSchema);
