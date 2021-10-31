import React from 'react'
import { Slide } from 'react-slideshow-image';
import './Facts.css'
import CovidPrecautions from './CovidPrecautions/CovidPrecautions';
import CovidSymptoms from './CovidSymptoms/CovidSymptoms';

export default function Facts() {
    return (
        <div>
            <div className="facts-title">
                Facts Collection Portal
            </div>
            <div className="facts-body">
                <p>Where new data on covid symptoms, countries of interest, covid variants can be added.</p>
                <p>What would you like to add information on?</p>
            </div>
            <div className="slide-container">
                <CovidSymptoms/>
                <CovidPrecautions/> 
            </div>
        </div>
    )
}
