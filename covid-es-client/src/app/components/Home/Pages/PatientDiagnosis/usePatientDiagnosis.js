import { useState } from "react";
import * as clientService from '../../../../../services/ClientService'
import { useHistory } from 'react-router-dom';

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

    //Closes dialog box
    const SetDialogClosed = () => {
        setIsOpen(false);
        setDialogFailed(false);
        setDialogSuccess(false);
        setConfirmLoading(false);
    }

    //Add event listeners to check boxes to allow patient diagnosis field to appear on demand
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

    //Handles the opening of the dialog box through checking if needed fields are entered
    const HandleOpenDialog = () => {
        const inputBoxes = document.getElementsByClassName("error-patient-message")
        
        
        //Remove error message if present
        if(inputBoxes[0].classList.contains("show-patient-error"))
            inputBoxes[0].classList.remove("show-patient-error")
        if(inputBoxes[1].classList.contains("show-patient-error"))
            inputBoxes[1].classList.remove("show-patient-error")
        if(inputBoxes[2].classList.contains("show-patient-error"))
            inputBoxes[2].classList.remove("show-patient-error")
        if(inputBoxes[3].classList.contains("show-patient-error"))
            inputBoxes[3].classList.remove("show-patient-error")

        //Add error message if fields are missing
        if(firstName === "" || lastName === "" || age === 1 || temperature === 1){
            if(firstName === "")
                inputBoxes[0].classList.add("show-patient-error")

            if(lastName === "")
                inputBoxes[1].classList.add("show-patient-error")

            if(age === 1)
                inputBoxes[2].classList.add("show-patient-error")
            
            if(temperature === 1)
                inputBoxes[3].classList.add("show-patient-error")

            return;
        }
        setIsOpen(true)
    }

    //Shows blood pressure fields if dizziness, fainting or blurred vision is selected
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

    //Retrieves values from form and sents to api to get patient diagnosis
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

    //Gets list of symptoms from api to display to user
    const GetSymptoms = () => {
        clientService.GetSymptoms(setKnownSymptoms, addCheckBoxEventListeners);
    }

    //When patient diagnosis is recieved user will be directed to patient
    const GoToPatient = (patient) => {
        history.push(`/Patient-Diagnosis/Patient/${patient}`);
    }

    return {
        SetDialogClosed,
        dialogSuccess,
        dialogFailed,
        modalIsOpen,
        confirmLoading,
        addCheckBoxEventListeners,
        DiagnosePatient,
        showBloodPressureCheck,
        GetSymptoms,
        HandleOpenDialog
    }
}

export default usePatientDiagnosis;