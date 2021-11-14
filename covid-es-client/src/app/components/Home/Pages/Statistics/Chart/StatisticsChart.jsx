import React from 'react'
import './StatisticsChart.css'
import { Chart } from "react-google-charts";

// Displays pie chart with received statistical data

export default function StatisticsChart({ data }) {
    return (
        <div className="chart-container-single">

            <Chart
                width={'400px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={data.stats}
                options={{
                    title: data.title,
                    is3D: true,

                }}
                rootProps={{ 'data-testid': '1' }}
            />
            <div>{data.comment}</div>
        </div>
    )
}
