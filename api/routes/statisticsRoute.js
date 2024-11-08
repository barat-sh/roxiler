import express from "express";
const router = express.Router();
import getStatistics from "../controller/statistics.js";

router.get("/statistics/:month", getStatistics);

export default router;