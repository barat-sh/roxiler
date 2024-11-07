import express from "express";
import prisma from "../prisma/prisma.js";
const router = express.Router();

router.get("/", async (req, res)=>{
    // const result = await prisma.productTransaction.create({
    //     data: {
    //         id: 95850955,
    //         title: "hello",
    //         description: "hello",
    //         category: "hello",
    //         price: 123,
    //         image: "hello",
    //         sold: false,
    //         dateOfSale: "2022-07-27T20:29:54+05:30"
    //     }
    // });
    const result = await prisma.productTransaction.findMany();
    res.json(result);
})

export default router;