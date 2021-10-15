import React from 'react'
import './SectionCard.css'

export default function SectionCard({Title, Icon}) {
    return (
        <div className="section-card">
            <div className="section-card-title">
                <span>{Title}</span>
            </div>
            <div className="section-card-img">
                <img src={Icon} alt="statisticsCard" />
            </div>
        </div>
    )
}
