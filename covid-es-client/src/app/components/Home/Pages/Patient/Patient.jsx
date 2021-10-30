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
        return () => {
            setPatient({})
        }
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
                                Name={"John Doe"}
                                Icon={manIcon}
                                Initials={"JD"}
                                Bio="Patient"
                            />               
                            <div>
                                COVID-19 Test Results 
                            </div>       
                        </div>
                        <div className="patient-container-body">
                            <div className="patient-results-container">
                                {
                                    <>
                                        <div className="patient-result negative">John Doe is not at risk of having COVID-19.</div>
                                        {/* <div className="patient-result positive">John Doe is at risk of having COVID-19.</div> */}
                                    </>
                                }

                                <div className="patient-precation-symptom">
                                    <div className="card patient-card patient-precations-list">
                                        <div>Please follow the listed PRECAUTIONS:</div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">An item</li>
                                            <li className="list-group-item">A second item</li>
                                            <li className="list-group-item">A third item</li>
                                            <li className="list-group-item">A fourth item</li>
                                            <li className="list-group-item">And a fifth one</li>
                                        </ul>
                                    </div>
                                    <div className="patient-card">
                                        <ul className="list-group symptoms-list">
                                            <li className="list-group-item active list-header">Symptoms Listed</li>
                                            <li className="list-group-item">Dapibus ac facilisis in</li>
                                            <li className="list-group-item">Morbi leo risus</li>
                                            <li className="list-group-item">Porta ac consectetur ac</li>
                                            <li className="list-group-item">Vestibulum at eros</li>
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
                                                    21
                                                }
                                            </li>
                                            <li className="list-group-item">
                                                <span className="list-title">Exposed:</span>
                                                {
                                                    "Yes"
                                                }
                                            </li>
                                            <li className="list-group-item">
                                                <span className="list-title">Temperature:</span>
                                                {
                                                    20
                                                }
                                            </li>
                                            <li className="list-group-item">
                                                <span className="list-title">Systolic Value:</span>
                                                {
                                                    20
                                                }
                                            </li>
                                            <li className="list-group-item">
                                                <span className="list-title">Diastolic Value:</span>
                                                {
                                                    30
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
