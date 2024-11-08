

import prisma from "../prisma/prisma.js";

export const getAllTransactions = async (req, res) => {
    const { search = '', page = 1, perPage = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const perPageNumber = parseInt(perPage, 10);

    try{
        const where = search
            ? {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                    { price: { equals: parseFloat(search) || undefined } }
                ]
            }
            : {};

        const transactions = await prisma.productTransaction.findMany({
            where,
            skip: (pageNumber - 1) * perPageNumber,
            take: perPageNumber,
        });

        const totalTransactions = await prisma.productTransaction.count({ where });

        return res.status(200).json({
            currentPage: pageNumber,
            perPage: perPageNumber,
            totalTransactions,
            totalPages: Math.ceil(totalTransactions / perPageNumber),
            transactions
        });
    }catch (err){
        console.error('Error fetching transactions:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
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

export const deleteTransaction = async (req, res) => {
    const id = req.params.id;
    const result = await prisma.productTransaction.delete({
        where: {
            id: parseInt(id)
        }
    })
    if(result){
        return res.status(200).json("Item Deleted of id -> " + result);
    }
    return res.status(404).json({message: "No products found with id " + id});
}