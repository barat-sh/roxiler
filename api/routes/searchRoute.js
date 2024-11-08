
import express from "express";
const router = express.Router();
import {getAllTransactions, getTransaction, deleteTransaction} from "../controller/search.js";

router.get('/getTransaction', getAllTransactions);
router.get('/getTransaction/:id', getTransaction);
router.delete('/deleteTransaction/:id', deleteTransaction);


export default router;