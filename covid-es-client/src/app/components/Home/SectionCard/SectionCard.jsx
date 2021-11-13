import React from 'react'
import './SectionCard.css'


// Displays section card on landing page with icon and title
export default function SectionCard({ Title, Icon }) {
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
