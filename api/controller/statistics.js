import prisma from "../prisma/prisma.js";

const getStatistics = async (req, res) => {
    const month = req.params.month;

    const result = await prisma.$queryRawUnsafe(`
      SELECT * FROM "ProductTransaction"
      WHERE EXTRACT(MONTH FROM "dateOfSale") = month;
    `);
    res.json({month: month, result: result});
}

export default getStatistics;