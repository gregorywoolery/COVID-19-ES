import React from 'react'
import './Card.css'


export default function Card({Name, Initials, Icon}) {
    return (
        <div className="card">
            <div className="card-header-img">
                <img className="card-img" src={Icon} alt="Card image cap" />
            </div>
            <div className="card-body">
                <div className="card-body-title">
                    <div className="card-body-title-content">{Name}</div>
                    <div className="card-body-title-logo">{Initials}</div>
                </div>
                <div className="card-body-content">
                    UTech 4th Year
                </div>
            </div>
        </div>
    )
}
