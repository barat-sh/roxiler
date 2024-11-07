
import express from "express";
import seed from "../store/seed.js";

const router = express.Router();

router.get('/seed', async (req, res) => {
    const seedingResult = await seed();
    if(seedingResult){
        res.status(200).json({message: "Seeded from S3"})
    }
    res.status(500).json({message:"Seeding Failed"})
})

export default router;