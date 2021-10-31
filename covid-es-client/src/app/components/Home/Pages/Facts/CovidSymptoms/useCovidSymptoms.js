import { useEffect, useState } from "react";
import * as clientService from '../../../../../../services/ClientService'

const useCovidSymptoms= () => {    
    const [symptom, setSymptom] = useState('');

    const [variant, setVariant] = useState('regular')
    const [variantsList, setVariantList] = useState({})
    const [dialogSuccess, setDialogSuccess] = useState(false);
    const [dialogFailed, setDialogFailed] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const SetDialogClosed = () => {
        setIsOpen(false);
        setDialogFailed(false);
        setDialogSuccess(false);
        setConfirmLoading(false);

        setSymptom('');
        setVariant('regular');
    }

    const AddNewSymptom = () => {
        setConfirmLoading(true);
        
        const symptomTypeInputs = document.getElementById("symptomType").options;        
        var selectedIndex = symptomTypeInputs.selectedIndex;

        const symptomTypeForm = symptomTypeInputs[selectedIndex].value;

        setTimeout(() => {
            clientService.AddFact("symptoms", symptom, variant, symptomTypeForm, setConfirmLoading, setDialogSuccess, setDialogFailed);            
        }, 2000);
    }

    useEffect(() => {
        clientService.GetVariants(setVariantList);
        return () => {}
    }, [])

    return {
        SetDialogClosed,
        dialogSuccess,
        dialogFailed,
        modalIsOpen,
        confirmLoading,
        setIsOpen,
        AddNewSymptom,
        setSymptom,
        setVariant,
        variantsList
    }
}

export default useCovidSymptoms;