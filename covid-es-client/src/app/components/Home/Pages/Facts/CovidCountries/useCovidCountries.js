import { useState } from "react";
import * as clientService from '../../../../../../services/ClientService'

const useCovidCountries = () => {    
    const [country, setCountry] = useState('');

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

    const AddNewCountry = () => {
        setConfirmLoading(true);

        setTimeout(() => {
            clientService.AddFact("countries", country, "all", setConfirmLoading, setDialogSuccess, setDialogFailed);
        }, 2000);
    }

    return {
        SetDialogClosed,
        dialogSuccess,
        dialogFailed,
        modalIsOpen,
        confirmLoading,
        setIsOpen,
        AddNewCountry,
        setCountry
    }
}

export default useCovidCountries;