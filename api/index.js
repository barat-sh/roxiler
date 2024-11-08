
import express from 'express';
import {config} from "dotenv";
import cors from "cors";
const app = express();
app.use(express.json());
const corsOptions = {
    origin: ['https://roxiler.barat.tech', 'https://roxiler.pages.dev/', 'https://0745e2ed.roxiler.pages.dev/'],
    methods: 'GET, POST, DELETE, PUT, PATCH',
    allowedHeaders: 'Content-Type'
};
app.use(cors(corsOptions));
config();

import searchRoute from "./routes/searchRoute.js";
import prisma from './prisma/prisma.js';
import s3seed from "./routes/s3Seed.js";
import statistics from "./routes/statisticsRoute.js";
import barchartRoute from "./routes/barchartRoute.js";
import pieChartRoute from "./routes/pieChartRoute.js";

app.use("/api", s3seed);
app.use("/api", searchRoute);
app.use("/api", statistics);
app.use("/api", barchartRoute);
app.use("/api", pieChartRoute);

app.get("/", (req, res)=>{
    res.send("json");
})

app.listen(3001, ()=>{
    console.log("Server hitting on port => " + process.env.PORT)
})