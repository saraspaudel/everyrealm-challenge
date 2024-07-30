import { Router } from 'express';
import { getOrders, getOrderById, createOrder } from '../controllers/orderController';

const router = Router();

router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);
router.post('/orders', createOrder);

export default router;
