import prisma from "../prisma/prisma.js";

const getStatistics = async (req, res) => {
    const month = req.params.month;

    const result = await prisma.$queryRawUnsafe(`
      SELECT
      sum(price) as totalAmount,
      COUNT(CASE WHEN sold = true THEN 1 END) as totalSoldItems,
      COUNT(CASE WHEN sold = false THEN 1 END) as totalNotSoldItems
       FROM "ProductTransaction"
      WHERE EXTRACT(MONTH FROM "dateOfSale") = ${month};
    `);

    const responseStatistics = {}

    for (const key in result[0]) {
        if (result[0].hasOwnProperty(key)) {
            responseStatistics[key] = result[0][key].toString()
        }
    }

    res.json({statistics: responseStatistics})
}

export default getStatistics;