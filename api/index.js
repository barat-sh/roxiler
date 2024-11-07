
import express from 'express';
import {config} from "dotenv";
import cors from "cors";

const app = express();
app.use(express.json());
config();

import searchRoute from "./routes/searchRoute.js";
import transactionsRoute from "./routes/transactions.js";
import prisma from './prisma/prisma.js';
import s3seed from "./routes/s3Seed.js";

app.use("/api/transfers", transactionsRoute);
app.use("/api", s3seed);
app.use("/api", searchRoute);

app.get("/", (req, res)=>{
    res.send("json");
})

app.listen(3001, ()=>{
    console.log("Server hitting on port => " + process.env.PORT)
})