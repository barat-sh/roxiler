import React, {useLayoutEffect, useState} from "react";
import { AgCharts } from "ag-charts-react";

// eslint-disable-next-line react/prop-types,react/display-name
const BarChart = React.memo(({ barChartData }) => {

    console.log(barChartData);

    useLayoutEffect(() => {
        setOptions({
            title: {
                text: "Monthly Transactions Chart",
            },
            data: barChartData,
            series: [
                {
                    type: "bar",
                    xKey: "range",
                    yKey: "count",
                    yName: "count",
                    stacked: true,
                }
            ],
            axes: [
                {
                    type: "number",
                    position: "left",
                    label: {
                        formatter: (params) => Math.round(params.value),
                    },
                },
                {
                    type: "category",
                    position: "bottom",
                },
            ],
        })
    }, [barChartData]);

    const [options, setOptions] = useState({});

    return <AgCharts options={options} />;
});

export default BarChart;