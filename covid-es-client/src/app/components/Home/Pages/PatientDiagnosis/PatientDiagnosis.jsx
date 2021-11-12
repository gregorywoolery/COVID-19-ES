import React, { useEffect, useState } from 'react'
import usePatientDiagnosis from './usePatientDiagnosis';
import './PatientDiagnosis.css'
import DialogModal from '../../Form.components/Dialog.Modal.component';
import _ from 'lodash'
import PatientFormInput from '../../Form.components/FormInput/PatientFormInput'
import symptomIcon from '../../../../../assets/symptom-icon.svg'


export default function PatientDiagnosis() {
    const [knownSymptoms, setKnownSymptoms] = useState({});

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState(1);
    const [temperature, setTemperature] = useState(1);
    const [systolic, setSystolic] = useState(1);
    const [diastolic, setDiastolic] = useState(1);
    const [covidExposed, setCovidExposed] = useState(0);


    const {
        SetDialogClosed,
        dialogSuccess,
        dialogFailed,
        modalIsOpen,
        confirmLoading,
        DiagnosePatient,
        showBloodPressureCheck,
        GetSymptoms,
        HandleOpenDialog
    } = usePatientDiagnosis(
        setKnownSymptoms,
        firstName,
        lastName,
        age,
        temperature,
        systolic,
        diastolic,
        covidExposed
    );


    useEffect(() => {
        GetSymptoms();
        return () => setKnownSymptoms({})

    }, [])


    return (
        <div className="content-container">
            {
                !_.isEmpty(knownSymptoms) ? (
                    <>
                        <div className="content-container-header">Patient Diagnosis</div>
                        <div className="content-container-grid">
                            <div className="content-container-content">
                                <form id="diagnose-patient-form">
                                    <div className="input-container-name">
                                        <PatientFormInput setFormField={setFirstName} fieldName="First Name" />
                                        <PatientFormInput setFormField={setLastName} fieldName="Last Name" />
                                        <PatientFormInput setFormField={setAge} fieldName="Age" fieldType="number" />
                                    </div>

                                    <label htmlFor="Exposed" className="form-label">Have you been expoed to anyone with Covid</label>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            value={1}
                                            onChange={(e) => setCovidExposed(1)}
                                            checked={covidExposed === 1}
                                        />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            value={0}
                                            onChange={(e) => setCovidExposed(0)}
                                            checked={covidExposed === 0}
                                        />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            No
                                        </label>
                                    </div>

                                    <div className="temperature-container">
                                        <PatientFormInput
                                            setFormField={setTemperature}
                                            fieldName="Enter your temperature in Celsius (C&#176;)"
                                            fieldType="number"
                                        />
                                    </div>

                                    <label htmlFor="Exposed" className="form-label">Are you experiencing any of these symptoms? Choose as many as you need</label>
                                    <div className="check-box-container">
                                        {
                                            knownSymptoms && (
                                                Array(knownSymptoms.length).fill(knownSymptoms).map((value, i) => (
                                                    <div className="mb-3 form-check" key={value[i].Symptom}>
                                                        <input type="checkbox" value={value[i].Symptom} className="form-check-input" />
                                                        <label className="form-check-label" htmlFor="exampleCheck1">
                                                            {
                                                                value[i].Symptom
                                                            }
                                                        </label>
                                                    </div>
                                                ))
                                            )
                                        }
                                    </div>
                                    {
                                        showBloodPressureCheck && (
                                            <>
                                                <PatientFormInput setFormField={setSystolic} fieldName="Systolic Value" fieldType="number" />
                                                <PatientFormInput setFormField={setDiastolic} fieldName="Diastolic Value" fieldType="number" />
                                            </>
                                        )
                                    }

                                    <div className="form-action-buttons">
                                        <button type="button" onClick={() => HandleOpenDialog()} className="btn btn-primary">Submit</button>
                                    </div>

                                    <DialogModal
                                        headerTitle={"Diagnosis"}
                                        content={"Are you sure the information you entered is correct ?"}
                                        successMessage={"View your results"}
                                        modalIsOpen={modalIsOpen}
                                        setClosed={SetDialogClosed}
                                        actionOnSubmit={DiagnosePatient}
                                        isLoading={confirmLoading}
                                        isError={dialogFailed}
                                        isSuccess={dialogSuccess}
                                    />
                                </form>
                            </div>
                            <div className="icon-container">
                                <img className="diagnosis-icon" src={symptomIcon} alt="patientDiagnosis" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div>Service Unavailable. Error 500.</div>
                )
            }

        </div>
    )
}
