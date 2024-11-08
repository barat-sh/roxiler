function getData(barChartData) {
    return [
        { range: '0-100', count: 0 },
        { range: '101-200', count: 0 },
        { range: '201-300', count: 1 },
        { range: '301-400', count: 0 },
        { range: '401-500', count: 0 },
        { range: '501-600', count: 0 },
        { range: '601-700', count: 0 },
        { range: '701-800', count: 2 },
        { range: '801-900', count: 0 },
        { range: '901-above', count: 0 }
    ]
}

export default getData;