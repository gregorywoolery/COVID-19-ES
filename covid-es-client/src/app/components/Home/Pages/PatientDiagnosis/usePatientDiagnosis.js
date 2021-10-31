import { useState } from "react";
import * as clientService from '../../../../../services/ClientService'
import { useHistory } from 'react-router-dom';
import _ from 'lodash'

const usePatientDiagnosis = (setKnownSymptoms) => {    
    const [dialogSuccess, setDialogSuccess] = useState(false);
    const [dialogFailed, setDialogFailed] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [showBloodPressureCheck, setShowBloodPressureCheck] = useState(false)

    const [symptoms, setSymptoms] = useState([]);

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
            // if(checkBox.checked){
            //     setSymptoms(symptoms => [...symptoms, this.value])
            //     const newSymptoms = symptoms.filter((symptom) => symptom !== this.value);
            //     setSymptoms(newSymptoms);
            // }


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

    const SubmitForm = (event) => {
        alert('hello')
        event.preventDefault();

        setConfirmLoading(true);
        
        const data = new FormData(event.target);
        var values = Object.fromEntries(data.entries());
        
        console.log(values);

        // setTimeout(() => {
        //     clientService.DiagnosePatient({"firstname": "GREGORY"}, setConfirmLoading, setDialogSuccess, setDialogFailed, GoToPatient);
        // }, 2000);
    }

    const DiagnosePatient = () => {
        var patientForm = document.getElementById("diagnose-patient-form");

        const form = new FormData(patientForm)
        console.log(form.values())

        // patientForm.submit((e) =>{
        //     e.preventDefault();

        //     alert('hello')
        // });
    }

    const GetSymptoms = () => {
        clientService.GetSymptoms(setKnownSymptoms, addCheckBoxEventListeners);
    }

    const GoToPatient = (patient) => {
        // setSymptoms({})
        history.push(`/Patient-Diagnosis/Patient/${'1'}`);
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
        SubmitForm
    }
}

export default usePatientDiagnosis;