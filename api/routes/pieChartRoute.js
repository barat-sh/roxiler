import express from "express";
const router = express.Router();
import pieChart from "../controller/pieChart.js";

router.get("/pieChart", pieChart)

export default router;