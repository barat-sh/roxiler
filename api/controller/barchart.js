import prisma from "../prisma/prisma.js";


const barchart =async (req, res) => {
    const month = req.params.month;

    const priceRanges = [
        { range: '0-100', count: 0 },
        { range: '101-200', count: 0 },
        { range: '201-300', count: 0 },
        { range: '301-400', count: 0 },
        { range: '401-500', count: 0 },
        { range: '501-600', count: 0 },
        { range: '601-700', count: 0 },
        { range: '701-800', count: 0 },
        { range: '801-900', count: 0 },
        { range: '901-above', count: 0 },
    ];

    const results = await prisma.$queryRawUnsafe(`
    SELECT 
      CASE 
        WHEN price BETWEEN 0 AND 100 THEN '0-100'
        WHEN price BETWEEN 101 AND 200 THEN '101-200'
        WHEN price BETWEEN 201 AND 300 THEN '201-300'
        WHEN price BETWEEN 301 AND 400 THEN '301-400'
        WHEN price BETWEEN 401 AND 500 THEN '401-500'
        WHEN price BETWEEN 501 AND 600 THEN '501-600'
        WHEN price BETWEEN 601 AND 700 THEN '601-700'
        WHEN price BETWEEN 701 AND 800 THEN '701-800'
        WHEN price BETWEEN 801 AND 900 THEN '801-900'
        ELSE '901-above'
      END AS price_range,
      COUNT(*) AS count
    FROM 
      "ProductTransaction"
    WHERE EXTRACT(MONTH FROM "dateOfSale") = ${month}
    GROUP BY 
      price_range
    ORDER BY 
      price_range;
  `);

    results.forEach(result => {
        const range = priceRanges.find(r => r.range === result.price_range);
        if (range) {
            range.count = Number(result.count);
        }
    });

    console.log(priceRanges);
    return res.json(priceRanges);
}

export default barchart;