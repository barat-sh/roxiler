

import prisma from "../prisma/prisma.js";

export const getAllTransactions = async (req, res) => {
    const result = await prisma.productTransaction.findMany();
    if (result) {
        return res.status(200).json(result);
    }
    return res.status(404).json({message: "No products found..."});
}

export const getTransaction = async (req, res) => {
    const id = req.params.id;
    const result = await prisma.productTransaction.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (result){
        return res.status(200).json(result);
    }
    return res.status(404).json({message: "No products found with id " + id});
}