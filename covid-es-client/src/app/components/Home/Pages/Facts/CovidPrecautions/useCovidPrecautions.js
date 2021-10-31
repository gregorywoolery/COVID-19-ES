import { useEffect, useState } from "react";
import * as clientService from '../../../../../../services/ClientService'

const useCovidPrecautions= () => {    
    const [precaution, setPrecaution] = useState('');
    
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

    const AddNewPrecaution = () => {
        setConfirmLoading(true)

        setTimeout(() => {
            clientService.AddFact("precautions", precaution, variant, null ,setConfirmLoading, setDialogSuccess, setDialogFailed);            
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
        AddNewPrecaution,
        setPrecaution,
        setVariant,
        variantsList
    }
}

export default useCovidPrecautions;