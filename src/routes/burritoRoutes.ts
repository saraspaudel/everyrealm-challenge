import { Router } from 'express';
import { getBurritos, createBurrito } from '../controllers/burritoController';

const router = Router();

router.get('/burritos', getBurritos);
router.post('/burritos', createBurrito);

export default router;
