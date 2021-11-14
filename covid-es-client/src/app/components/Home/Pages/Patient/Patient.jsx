import React, { useEffect, useState } from 'react'
import manIcon from '../../../../../assets/man.svg'
import { useRouteMatch } from 'react-router';
import * as clientService from '../../../../../services/ClientService';
import './Patient.css'
import _ from 'lodash'
import Thermometer from 'react-thermometer-component'


//Page to display patient results
export default function Patient() {
    const [patient, setPatient] = useState({});
    // Gets patient id from url to use to retrieve user data
    const match = useRouteMatch();

    //When pages loads get user data
    useEffect(() => {
        clientService.GetPatient(match.params.patientid, setPatient)
        return () => setPatient({})
    }, [])

    return (
        <div className="patient-container">
            {
                _.isEmpty(patient) ? (
                    <div>
                        No Patient
                    </div>
                ) : (
                    <div className="patient-container-content">
                        <div className="patient-container-side-content">
                            <div className="patient-container-header patient-container-card">
                                <div className="patient-icon-container">
                                    <img src={manIcon} alt="man-patient" />
                                </div>

                                <div>{patient.firstName + ' ' + patient.lastName}</div>
                                <div>Patient</div>
                                <div>{patient.age} years</div>
                                <div>Exposed:
                                    {
                                        patient.covid_exposed === 1 ? " Yes"
                                            : patient.covid_exposed === 0 && " No"
                                    }
                                </div>
                                <Thermometer
                                    theme="light"
                                    value={patient.temperature}
                                    max="150"
                                    steps="4"
                                    format="F"
                                    size="medium"
                                    height="300"
                                />
                            </div>
                            <div className="patient-container-card">
                                <div>
                                    Systolic Value: {patient.systolic}
                                </div>
                                <div>
                                    Diastolic Value: {patient.diastolic}
                                </div>
                            </div>
                        </div>


                        <div className="patient-container-body patient-container-card">
                            <div className="patient-container-body-head">COVID-19 Test Results</div>
                            <div className="patient-results-container">
                                {
                                    patient.risk_analysis === 0 ? (
                                        <div className="patient-result negative">{patient.risk_note}</div>
                                    ) : patient.risk_analysis === 1 ? (
                                        <div className="patient-result positive">{patient.risk_note + " with COVID-19 " + patient.variant} </div>
                                    ) : patient.risk_analysis === 2 && (
                                        <div className="patient-result positive-alert">{patient.risk_note + " with COVID-19 " + patient.variant}</div>
                                    )
                                }

                                <div className="patient-precation-symptom">
                                    <div className="card patient-card patient-precations-list">
                                        <div>Please follow the listed PRECAUTIONS:</div>
                                        <div>Short Term</div>
                                        <ul className="list-group list-group-flush">
                                            {
                                                Array(patient.short_term_actions.length).fill(patient.short_term_actions).map((value, i) => (
                                                    <li className="list-group-item" key={value[i]}>{value[i]}</li>
                                                ))
                                            }
                                        </ul>
                                        <div>Long Term</div>
                                        <ul className="list-group list-group-flush">
                                            {
                                                Array(patient.long_term_actions.length).fill(patient.long_term_actions).map((value, i) => (
                                                    <li className="list-group-item" key={value[i]}>{value[i]}</li>
                                                ))
                                            }
                                        </ul>

                                    </div>
                                    <div className="patient-card .patient-container-card symptoms-card">
                                        <div>Symptoms Listed</div>
                                        <ul className="list-group symptoms-list">
                                            {
                                                Array(patient.symptoms.length).fill(patient.symptoms).map((value, i) => (
                                                    <li className="list-group-item" key={value[i]}>{value[i]}</li>
                                                ))
                                            }

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            }


        </div>
    )
}
