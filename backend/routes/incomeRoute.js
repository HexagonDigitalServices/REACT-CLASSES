import { Router } from "express";
import authMiddleware from '../middleware/auth.js';
import { addIncome, deleteIncome, downloadIncomeExcel, getAllIncome, getIncomeOverview, updateIncome } from "../controllers/incomeController.js";

const incomeRouter = Router()

incomeRouter.post('/add', authMiddleware, addIncome)
incomeRouter.get('/get', authMiddleware, getAllIncome)
incomeRouter.put('/update/:id', authMiddleware, updateIncome)
incomeRouter.get('/downloadexcel', authMiddleware, downloadIncomeExcel)
incomeRouter.delete('/delete/:id', authMiddleware, deleteIncome)
incomeRouter.get('/overview', authMiddleware, getIncomeOverview)

export default incomeRouter