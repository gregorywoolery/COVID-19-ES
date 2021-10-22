import React from 'react'
import FactsCard from './FactsCard/FactsCard';
import { Slide } from 'react-slideshow-image';
import './Facts.css'
import covid19 from '../../../../../assets/img/Covid-19.jpg'
import covidCountries from '../../../../../assets/img/covid-countries.jpg'
import covidDelta from '../../../../../assets/img/Covid-Delta.jpg'
import covidMu from '../../../../../assets/img/Covid-Mu.jpg'
import covidPrecautions from '../../../../../assets/img/precautions.jpg'

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
                    <FactsCard title="Covid Countries" icon={covidCountries}/>
                    <FactsCard title="Delta Variant Symptoms" icon={covidDelta}/>
                    <FactsCard title="Mu Variant Symptoms" icon={covidMu}/>
                    <FactsCard title="New Precations" icon={covidPrecautions}/>
                    <FactsCard title="Covid-19" icon={covid19}/>
                </Slide>
            </div>
        </div>
    )
}
