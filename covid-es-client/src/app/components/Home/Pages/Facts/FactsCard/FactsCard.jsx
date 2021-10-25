import React from 'react';
import './FactsCard.css'
import addButton from '../../../../../../assets/add.svg'

export default function FactsCard({title, icon, setIsOpen}) {
  return (
    <>
        <div className="facts-card">
            <div className="facts-card-container">
              <div className="facts-card-title">{title}</div>
              <div className="facts-card-body">
                <img className="fact-card-backgorund" src={icon} alt="Covid-19" />
              </div>
            </div>
            <div className="button-actions">
              <img className="button-add" onClick={() => setIsOpen(true)} src={addButton} alt="add" />
            </div>
        </div>
    </>
  )
}
