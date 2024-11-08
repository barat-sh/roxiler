import express from 'express';
import barchart from "../controller/barchart.js";
const router = express.Router();

router.get('/priceRange/:month', barchart)

export default router;