import React, { useEffect, useState } from 'react'
import usePatientDiagnosis from './usePatientDiagnosis';
import './PatientDiagnosis.css'
import DialogModal from '../../Form.components/Dialog.Modal.component';
import _ from 'lodash'

export default function PatientDiagnosis() {
    const [results, setResults] = useState();    


    const {
        SetDialogClosed,
        dialogSuccess,
        dialogFailed,
        modalIsOpen,
        confirmLoading,
        setIsOpen,
        addCheckBoxEventListeners,
        DiagnosePatient
    } = usePatientDiagnosis(setResults);


    useEffect(() => {
        addCheckBoxEventListeners();
        return () => {}
    }, [])


    return (
        <div className="content-container">
            {
                _.isNil(results) && (
                    <>
                        <div className="content-container-header">Patient Diagnosis</div>
                            <div className="content-container-content">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="InputName" className="form-label">First Name</label>
                                        <input type="text" className="form-control" id="InputName"/>
                                        <div id="" className="form-text"></div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="InputName" className="form-label">Last Name</label>
                                        <input type="text" className="form-control" id="InputName"/>
                                        <div id="" className="form-text"></div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Age</label>
                                        <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                        <div id="emailHelp" className="form-text"></div>
                                    </div>
                                    <label htmlFor="Exposed" className="form-label">Have you been expoed to anyone with Covid</label>
                                    <select defaultValue={0} className="form-select" aria-label="Default select example">
                                        <option value="0" >Select</option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>

                                    <div className="mb-3">
                                        <label htmlFor="InputName" className="form-label">Enter your temperature in degrees celcius</label>
                                        <input type="text" className="form-control" id="InputName" aria-describedby="emailHelp"/>
                                        <div id="emailHelp" className="form-text"></div>
                                    </div>

                                    <label htmlFor="Exposed" className="form-label">Are you experiencing any of these symptoms? Choose as many as you need</label>
                                    <div className="check-box-container">
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" value="dizziness" className="form-check-input" id="dizziness"/>
                                            <label className="form-check-label" htmlFor="exampleCheck1">Dizziness</label>
                                        </div>

                                        <div className="mb-3 form-check">
                                            <input type="checkbox" value="fever" className="form-check-input" id="fever"/>
                                            <label className="form-check-label" htmlFor="exampleCheck1">Fever</label>
                                        </div>

                                        <div className="mb-3 form-check">
                                            <input type="checkbox" value="extreme tiredness" className="form-check-input" id="extreme"/>
                                            <label className="form-check-label" htmlFor="exampleCheck1">Extreme Tiredness</label>
                                        </div>

                                        <div className="mb-3 form-check">
                                            <input type="checkbox" value="sore throat" className="form-check-input" id="sore"/>
                                            <label className="form-check-label" htmlFor="exampleCheck1">Sore throat</label>
                                        </div>

                                        <div className="mb-3 form-check">
                                            <input type="checkbox" value="chest pain" className="form-check-input" id="chest"/>
                                            <label className="form-check-label" htmlFor="exampleCheck1">Chest Pain</label>
                                        </div>

                                        <div className="mb-3 form-check">
                                            <input type="checkbox" value="diarrhoea" className="form-check-input" id="diarrhoea"/>
                                            <label className="form-check-label" htmlFor="exampleCheck1">Diarrhoea</label>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="InputName" className="form-label">Systolic Value</label>
                                        <input type="text" className="form-control" id="InputName" aria-describedby="emailHelp"/>
                                        <div id="emailHelp" className="form-text"></div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="InputName" className="form-label">Diastolic Value</label>
                                        <input type="text" className="form-control" id="InputName" aria-describedby="emailHelp"/>
                                        <div id="emailHelp" className="form-text"></div>
                                    </div>

                                    <div className="form-action-buttons">
                                        <button type="button" onClick={ () => setIsOpen(true)} className="btn btn-primary">Submit</button>                
                                    </div>
                                </form>
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
                    </>
                )
            }

        </div>
    )
}
