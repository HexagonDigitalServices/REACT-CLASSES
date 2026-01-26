import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';
import path from 'path';

import userRouter from './routes/userRoute.js';
import watchRouter from './routes/watchRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Routes
app.use("/api/auth", userRouter);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); // serve uploaded images
app.use("/api/watches", watchRouter);
app.use('/api/cart', cartRouter)
app.use("/api/orders", orderRouter)


app.get('/', (req, res) => {
    res.send('API Working');
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
