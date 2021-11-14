import { useEffect, useState } from "react";
import * as clientService from '../../../../../services/ClientService';

// Custom hook to allow adding facts functionality to page
// "useEffect" hook used to get variants when facts page loads
const useFacts = () => {
    const [variantsList, setVariantList] = useState({})
    const [precaution, setPrecaution] = useState('');
    const [symptom, setSymptom] = useState('');
    const [variant, setVariant] = useState('regular');
    const [bloodPressureSymptom, setBloodPressureSymptom] = useState('');
    const [bloodPressureSymptomList, setBloodPressureSymptomList] = useState({});
    const [dialogData, setDialogData] = useState({})

    const [dialogSuccess, setDialogSuccess] = useState(false);
    const [dialogFailed, setDialogFailed] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    //Closes the facts dialog modal
    const SetDialogClosed = () => {
        setIsOpen(false);
        setDialogFailed(false);
        setDialogSuccess(false);
        setConfirmLoading(false);

        setSymptom('');
        setVariant('regular');
    }

    // Validates the information entered to ensure fields are not missing
    const validationCheck = () => {
        const factInput = document.getElementById("factInput");
        const errorMessage = document.getElementById("error-message");
        if(factInput.value === ""){
            factInput.classList.add('factInput-error-show');  
            errorMessage.classList.add("input-error"); 
            return 1;
        }

        if(factInput.classList.contains("factInput-error-show"))
            factInput.classList.remove("factInput-error-show") 
        if(errorMessage.classList.contains("input-error"))    
            errorMessage.classList.remove("input-error")   

        return 0;
    }

    // Function gets data from fields and makes request to api to add new precaution fact
    const AddNewPrecaution = () => {        
        const validation = validationCheck();
        if(validation === 1)
            return;

        setConfirmLoading(true)

        const precautionTypeInputs = document.getElementById("precautionType").options;        
        var selectedIndex = precautionTypeInputs.selectedIndex;

        const precautionType = precautionTypeInputs[selectedIndex].value;
        const newPrecaution = document.getElementById('factInput').value

        setTimeout(() => {
            clientService.AddPrecautionFact(newPrecaution, precautionType, setConfirmLoading, setDialogSuccess, setDialogFailed);            
        }, 2000);
    }

    // Function gets data from fields and makes request to api to add new symptom fact
    const AddNewSymptom = () => {
        const validation = validationCheck();
        if(validation === 1)
            return;

        setConfirmLoading(true);
        
        const symptomTypeInputs = document.getElementById("symptomType").options;        
        var selectedIndex = symptomTypeInputs.selectedIndex;
        const symptomTypeForm = symptomTypeInputs[selectedIndex].value;

        const variantInputs = document.getElementById("dropdown-list").options;
        selectedIndex = variantInputs.selectedIndex;
        const variantSelect = variantInputs[selectedIndex].value;

        const newSymptom = document.getElementById('factInput').value;
        
        setTimeout(() => {
            clientService.AddSymptomsFact(newSymptom, variantSelect, symptomTypeForm, setConfirmLoading, setDialogSuccess, setDialogFailed);            
        }, 2000);
    }

    // Function gets data from fields and makes request to api to add new blood pressure symptom fact
    const AddNewBloodPressureSymptom = () => {
        setConfirmLoading(true);
        
        const symptomsList = document.getElementById("bloodPressureSymptom").options;
        var selectedIndex = symptomsList.selectedIndex;
        const newBloodPressureSymptom = symptomsList[selectedIndex].value;
        
        setTimeout(() => {
            clientService.AddBloodPressureSymptomsFact(newBloodPressureSymptom, setConfirmLoading, setDialogSuccess, setDialogFailed);            
        }, 2000);
    }

    // Allows the user to dynamically set dialog container contents with precaution settings
    const showPrecationDialog = () => {
        const dialogDataSet = {
            title:"New Covid-19 Precautions",
            content:"You are entering data for Covid-19 Precautions",
            factType:"precaution",
            setFormField:setPrecaution,
            actionOnSubmit:AddNewPrecaution
        }
        setDialogData(prevState => dialogDataSet);
        setIsOpen(true)
    }

    // Allows the user to dynamically set dialog container contents with symptoms settings
    const showSymptomDialog = () => {
        const dialogDataSet = {
            title:"New Covid-19 Symptoms",
            content:"You are entering data for Covid-19 Symptoms",
            factType:"symptom",
            setFormField:setSymptom,
            actionOnSubmit:AddNewSymptom
        }
        setDialogData(prevState => dialogDataSet);
        setIsOpen(true)
    }

    // Allows the user to dynamically set dialog container contents with blood pressure symptoms settings
    const showBloodPressureDialog = () => {
        const dialogDataSet = {
            title:"New Blood Pressure Symptoms",
            content:"You are entering data for Blood Pressure Check Symptoms",
            factType:"blood pressure symptom",
            setFormField:setBloodPressureSymptom,
            actionOnSubmit:AddNewBloodPressureSymptom
        }
        clientService.GetNoneBloodPressureSymptoms(setBloodPressureSymptomList)
        .catch(()=> {return});

        setDialogData(prevState => dialogDataSet);
        setIsOpen(true)
    }

    useEffect(() => {
        clientService.GetVariants(setVariantList);
        return () => setVariantList({})
    }, [])

    return {
        showPrecationDialog,
        showSymptomDialog,
        showBloodPressureDialog,
        dialogData,
        SetDialogClosed,
        dialogSuccess,
        dialogFailed,
        modalIsOpen,
        confirmLoading,
        variantsList,
        setVariant,
        bloodPressureSymptomList
    }
}

export default useFacts;