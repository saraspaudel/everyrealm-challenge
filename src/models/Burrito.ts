import { Schema, model } from 'mongoose';

const burritoSchema = new Schema({
    name: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    options: { type: [String], default: [] }
});

export const Burrito = model('Burrito', burritoSchema);
