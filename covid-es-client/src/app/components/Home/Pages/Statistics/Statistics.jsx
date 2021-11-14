import React, { useEffect, useState } from 'react'
import axinstance from '../../../../../services/AxiosService'
import './Statistics.css'
import _ from 'lodash'
import StatisticsChart from './Chart/StatisticsChart';


// Displays Statistics page to user
// "useEffect" hook allows page to request statistics data from api when the page loads
// If successful, Risk, Variant, Symptoms statistical data is placed in state variable
// this allows it to be added to the StatsChart component to display Chart to user
export default function Statistics() {
    const [statsRisk, setStatsRisk] = useState({})
    const [statsVariants, setStatsVariants] = useState({})
    const [statsSymptom, setStatsSymptom] = useState({})


    useEffect(() => {
        axinstance.get('/api/statistics').then((data) => {
            setStatsRisk({
                stats: [
                    ['Task', 'RiskAnalysis'],
                    ['Risk', data.data.Risk.AtRisk.amount],
                    ['No Risk', data.data.Risk.NoneRisk.amount]
                ],
                title: 'Pie chart showing Patients at Risk of COVID-19',
                comment: `Patients at risk were ${data.data.Risk.AtRisk.percentage}% while none risk where ${data.data.Risk.NoneRisk.percentage}%.`
            })
            setStatsVariants({
                stats: [
                    ['Task', 'Variant Number'],
                    ['Delta', data.data.CovidVariant.Delta.amount],
                    ['Mu', data.data.CovidVariant.Mu.amount],
                    ['Regular', data.data.CovidVariant.Regular.amount],
                ],
                title: 'Pie chart showing Covid Variants from Patients',
                comment: `Patients with Delta recorded at ${data.data.CovidVariant.Delta.percentage}% while Mu recorded at ${data.data.CovidVariant.Mu.percentage}%. Regular was ${data.data.CovidVariant.Regular.percentage}%.`

            })
            setStatsSymptom({
                stats: [
                    ['Task', 'Symptom Numbers'],
                    ['Mild Symptoms', data.data.Symptom.Mild.amount],
                    ['Severe Symptoms', data.data.Symptom.Severe.amount]
                ],
                title: 'Pie chart showing Covid Symptoms Type from Patients',
                comment: `Patients at with Mild symptoms were recorded at ${data.data.Symptom.Mild.percentage}% while severe at ${data.data.Symptom.Severe.percentage}%.`

            })
        });
    }, [])

    return (
        <div className="statistics-container">
            {
                _.isEmpty(statsRisk) ? "No records to show statistics" :
                    (
                        <>
                            <StatisticsChart data={statsRisk} />
                            <StatisticsChart data={statsVariants} />
                            <StatisticsChart data={statsSymptom} />
                        </>
                    )
            }
        </div>
    )
}
