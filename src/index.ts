import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import burritoRoutes from './routes/burritoRoutes';
import orderRoutes from './routes/orderRoutes';
import { apiKeyAuth } from './middleware/auth';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(apiKeyAuth);
app.use('/api', burritoRoutes);
app.use('/api', orderRoutes);

mongoose.connect(process.env.MONGO_URI!, {})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;

