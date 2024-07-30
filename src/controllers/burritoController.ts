import { Request, Response } from 'express';
import { Burrito } from '../models/Burrito';

export const getBurritos = async (req: Request, res: Response) => {
    const burritos = await Burrito.find();
    res.json(burritos);
};

export const createBurrito = async (req: Request, res: Response) => {
    const { name, size, price, options } = req.body;
    const burrito = new Burrito({ name, size, price, options });
    await burrito.save();
    res.status(201).json(burrito);
};
