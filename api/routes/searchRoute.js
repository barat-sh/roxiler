
import express from "express";
const router = express.Router();
import {getAllTransactions, getTransaction} from "../controller/search.js";

router.get('/getAllTransactions', getAllTransactions);
router.get('/getTransaction/:id', getTransaction);

export default router;