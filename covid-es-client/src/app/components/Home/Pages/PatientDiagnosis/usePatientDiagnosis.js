import { useState } from "react";
import * as clientService from '../../../../../services/ClientService'
import { useHistory } from 'react-router-dom';
import _ from 'lodash'

const usePatientDiagnosis = (
    setKnownSymptoms,
    firstName,
    lastName,
    age,
    temperature,
    systolic,
    diastolic,
    covidExposed
    ) => {    
    const [dialogSuccess, setDialogSuccess] = useState(false);
    const [dialogFailed, setDialogFailed] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [showBloodPressureCheck, setShowBloodPressureCheck] = useState(false)

    const history = useHistory();

    const SetDialogClosed = () => {
        setIsOpen(false);
        setDialogFailed(false);
        setDialogSuccess(false);
        setConfirmLoading(false);
    }

    const addCheckBoxEventListeners = () => {
        const checkInputs = document.getElementsByClassName("form-check-input");

        for (var checkBox of checkInputs) {
            checkBox.addEventListener('change', function() {
                if (this.checked === true){                    
                    if(this.value === "dizziness" || 
                        this.value === "fainting" ||
                        this.value === "blurred vision")   
                        setShowBloodPressureCheck(true);
                }
                else{
                    ShowBloodPressureCheck()
                }
            })
        }
    }

    const ShowBloodPressureCheck = () => {
        const checkInputs = document.getElementsByClassName("form-check-input");
        var hasBloodPressureCheck = false;

        for (var checkBox of checkInputs) {
            if( checkBox.value === "dizziness"  || 
                checkBox.value === "fainting"   ||
                checkBox.value === "blurred vision")   
            {
                if(checkBox.checked)
                    hasBloodPressureCheck = true;
            }    

            setShowBloodPressureCheck(hasBloodPressureCheck)
        }
    }

    const DiagnosePatient = () => {
        setConfirmLoading(true);

        const checkInputs = document.getElementsByClassName("form-check-input");
        var symptoms = []
        
        for (var checkBox of checkInputs) {
            if(checkBox.checked)
            symptoms = [...symptoms, checkBox.value]                         
        }
        symptoms.shift();

        const patient ={
            firstName,
            lastName,
            age,
            covidExposed,
            temperature,
            symptoms,
            systolic,
            diastolic
        }

        setTimeout(() => {
            clientService.DiagnosePatient(patient, setConfirmLoading, setDialogSuccess, setDialogFailed, GoToPatient);
        }, 2000);
    }

    const GetSymptoms = () => {
        clientService.GetSymptoms(setKnownSymptoms, addCheckBoxEventListeners);
    }

    const GoToPatient = (patient) => {
        history.push(`/Patient-Diagnosis/Patient/${patient}`);
    }

    return {
        SetDialogClosed,
        dialogSuccess,
        dialogFailed,
        modalIsOpen,
        confirmLoading,
        setIsOpen,
        addCheckBoxEventListeners,
        DiagnosePatient,
        showBloodPressureCheck,
        GetSymptoms,
    }
}

export default usePatientDiagnosis;