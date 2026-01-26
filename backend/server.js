import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';

import userRouter from './routes/userRoute.js';
import incomeRouter from './routes/incomeRoute.js';
import expenseRouter from './routes/expenseRoute.js';
import dashboardRouter from './routes/dashboardRoute.js';


const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Routes
app.use("/api/user", userRouter);
app.use("/api/income", incomeRouter)
app.use("/api/expense", expenseRouter)
app.use("/api/dashboard", dashboardRouter)

app.get('/', (req, res) => {
    res.send('API Working');
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
