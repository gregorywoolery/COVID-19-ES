import { useEffect, useState } from "react";
import * as clientService from '../../../../../../services/ClientService'

const useCovidSymptoms= () => {    
    const [symptom, setSymptom] = useState('');
    
    const [variant, setVariant] = useState('')
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
    }

    const AddNewSymptom = () => {
        setConfirmLoading(true)
        
        setTimeout(() => {
            clientService.AddFact("symptoms", symptom, variant, setConfirmLoading, setDialogSuccess, setDialogFailed);            
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