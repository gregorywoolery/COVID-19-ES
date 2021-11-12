import React, { useEffect, useState } from 'react'
import Card from '../../Card/Card'
import manIcon from '../../../../../assets/man.svg'
import { useRouteMatch } from 'react-router';
import * as clientService from '../../../../../services/ClientService';
import './Patient.css'
import _ from 'lodash'


export default function Patient() {
    const [patient, setPatient] = useState({});
    const match = useRouteMatch();

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
                        <div className="patient-container-header">
                            <Card
                                Name={patient.firstName + ' ' + patient.lastName}
                                Icon={manIcon}
                                Initials={
                                    patient.firstName.toUpperCase().charAt(0) +
                                    patient.lastName.toUpperCase().charAt(0)
                                }
                                Bio="Patient"
                            />
                            <div>
                                COVID-19 Test Results
                            </div>
                        </div>
                        <div className="patient-container-body">
                            <div className="patient-results-container">
                                {
                                    patient.risk_analysis === 0 ? (
                                        <div className="patient-result negative">{patient.risk_note}</div>
                                    ) : patient.risk_analysis === 1 ? (
                                        <div className="patient-result positive">{patient.risk_note}</div>
                                    ) : patient.risk_analysis === 2 && (
                                        <div className="patient-result positive-alert">{patient.risk_note}</div>
                                    )
                                }

                                <div className="patient-precation-symptom">
                                    <div className="card patient-card patient-precations-list">
                                        <div>Please follow the listed PRECAUTIONS:</div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item active">Short Term</li>
                                            {
                                                Array(patient.short_term_actions.length).fill(patient.short_term_actions).map((value, i) => (
                                                    <li className="list-group-item" key={value[i]}>{value[i]}</li>
                                                ))
                                            }
                                            <li className="list-group-item active">Long Term</li>
                                            {
                                                Array(patient.long_term_actions.length).fill(patient.long_term_actions).map((value, i) => (
                                                    <li className="list-group-item" key={value[i]}>{value[i]}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div className="patient-card">
                                        <ul className="list-group symptoms-list">
                                            <li className="list-group-item active list-header">Symptoms Listed</li>
                                            {
                                                Array(patient.symptoms.length).fill(patient.symptoms).map((value, i) => (
                                                    <li className="list-group-item" key={value[i]}>{value[i]}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div className="patient-bio-container">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Bio</h5>
                                        <ol className="list-group list-group-numbered">
                                            <li className="list-group-item">
                                                <span className="list-title">Age:</span>
                                                {
                                                    patient.age
                                                }
                                            </li>
                                            <li className="list-group-item">
                                                <span className="list-title">Exposed:</span>
                                                {
                                                    patient.covid_exposed === 1 ? "Yes"
                                                        : patient.covid_exposed === 0 && "No"
                                                }
                                            </li>
                                            <li className="list-group-item">
                                                <span className="list-title">Temperature:</span>
                                                {
                                                    "F " + patient.temperature
                                                }
                                            </li>
                                            <li className="list-group-item">
                                                <span className="list-title">Systolic Value:</span>
                                                {
                                                    patient.systolic
                                                }
                                            </li>
                                            <li className="list-group-item">
                                                <span className="list-title">Diastolic Value:</span>
                                                {
                                                    patient.diastolic
                                                }
                                            </li>
                                        </ol>
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
