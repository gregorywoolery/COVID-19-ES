import { useState } from "react";
import * as clientService from '../../../../../services/ClientService'
import { useHistory } from 'react-router-dom';


const usePatientDiagnosis = (setResults) => {    
    const [dialogSuccess, setDialogSuccess] = useState(false);
    const [dialogFailed, setDialogFailed] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
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
            checkBox.addEventListener('click', function() {
                if (this.checked === true)
                    setSymptoms(symptoms => [...symptoms, this.value])
                else{
                    const newSymptoms = symptoms.filter((symptom) => symptom !== this.value);
                    setSymptoms(newSymptoms);
                }
            })
        }
    }

    const DiagnosePatient = (e) => {
        setConfirmLoading(true);
        setTimeout(() => {
            clientService.DiagnosePatient({"firstname": "GREGORY"}, setResults, setConfirmLoading, setDialogSuccess, setDialogFailed, GoToPatient);
        }, 2000);
    }

    const GoToPatient = (patient) => {
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
        DiagnosePatient
    }
}

export default usePatientDiagnosis;