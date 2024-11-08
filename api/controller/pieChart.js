import prisma from "../prisma/prisma.js";
const pieChart = async (req, res) => {
    const response = await prisma.productTransaction.groupBy({
        by: ['category'],
        _count: {
            id: true,
        },
    })

    const result = response.map(item => ({
                category: item.category,
                count: item._count.id,
            }))

    console.log(result);
    res.json(result);
}

export default pieChart;