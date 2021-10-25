import React from 'react'
import { Slide } from 'react-slideshow-image';
import './Facts.css'
import CovidCountries from './CovidCountries/CovidCountries';
import CovidPrecautions from './CovidPrecautions/CovidPrecautions';
import CovidSymptoms from './CovidSymptoms/CovidSymptoms';

export default function Facts() {
    const properties = {
        duration: 0,
        transitionDuration:'500',
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: false,
        indicators: true,
    };

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
                <Slide {...properties}>
                    <CovidCountries/>
                    <CovidSymptoms/>
                    <CovidPrecautions/> 
                </Slide>
            </div>
        </div>
    )
}
