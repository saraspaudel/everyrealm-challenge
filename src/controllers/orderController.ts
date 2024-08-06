import { Request, Response } from 'express';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import { Burrito } from '../models/Burrito';

export const getOrders = async (req: Request, res: Response) => {
    const orders = await Order.find().populate({
        path: 'items',
        populate: {
            path: 'burrito',
            model: 'Burrito'
        }
    });
    res.json(orders);
};

export const getOrderById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await Order.findById(id).populate({
        path: 'items',
        populate: {
            path: 'burrito',
            model: 'Burrito'
        }
    });
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
};

export const createOrder = async (req: Request, res: Response) => {
    const { items } = req.body;

    let totalCost = 0;
    const orderItems = await Promise.all(
        items.map(async (item: { burritoId: string, quantity: number }) => {
            const burrito = await Burrito.findById(item.burritoId);
            if (!burrito) {
                throw new Error('Burrito not found');
            }
            totalCost += burrito.price * item.quantity;
            const orderItem = new OrderItem({ burrito, quantity: item.quantity });
            await orderItem.save();
            return orderItem;
        })
    );

    const order = new Order({ items: orderItems, totalCost });
    await order.save();

    // Issue loyalty points based on the total cost
    const pointsToIssue = totalCost; // 1 point per dollar spent
    await issueLoyaltyPoints(userAddress, pointsToIssue);

    res.status(201).json(order);
};
