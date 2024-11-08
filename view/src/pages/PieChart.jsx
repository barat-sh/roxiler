const PieChart = ({ pieChartData }) => {
    return (
        <div className="">
            {Object.keys(pieChartData).map(key => (
                <h3 className="m-2 text-xl" key={key}>
                    {pieChartData[key]?.category}:
                    {pieChartData[key]?.count}
                </h3>
            ))}
        </div>
    )
}

export default PieChart;