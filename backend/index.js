import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';
import path from 'path';
import parentRouter from './routes/parentRouter.js';
import tutorRouter from './routes/tutorRoutes.js';
import applicationRouter from './routes/tutorApplicationRouter.js';
import requestRouter from './routes/parentApplicationRouter.js';
import adminRouter from './routes/adminRouter.js';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Routes
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); 
app.use("/api/tutors", tutorRouter);
app.use("/api/parents", parentRouter)
app.use("/api", applicationRouter)
app.use("/api/tutor-requests", requestRouter);
app.use("/api/admin", adminRouter)


app.get('/', (req, res) => {
    res.send('API Working');
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
