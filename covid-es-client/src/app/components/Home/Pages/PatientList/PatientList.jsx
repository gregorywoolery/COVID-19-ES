import React from 'react'
import usePatientList from './usePatientList'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import './PatientList.css'
import manIcon from '../../../../../assets/man.svg'
export default function PatientList() {
    const {
        patientList
    } = usePatientList()

    return (
        <div className="patient-container-page">
            <div>Patient List</div>
            <div className="patient-container-content">
                {
                    patientList && patientList.length !== 0 && (
                        Array(patientList.length).fill(patientList).map((value, i) => (
                            patientList && (
                                <Link key={value[i].id} to={`/Patient-Diagnosis/Patient/${value[i].id}`} className="nav_link">
                                    <div className="patient-link-container">
                                        <img src={manIcon} className="patient-icon-man" alt="man-icon" />
                                        {/* <div>{value[i].id}</div> */}
                                        <div>{value[i].name}</div>
                                    </div>
                                </Link>
                            )

                        ))
                    )
                }
            </div>
        </div>
    )
}
