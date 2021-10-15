import { useState } from "react";

const usePatientDiagnosis = () => {    
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

    return {
        SetDialogClosed,
        dialogSuccess,
        dialogFailed,
        modalIsOpen,
        confirmLoading,
        setIsOpen
    }
}

export default usePatientDiagnosis;