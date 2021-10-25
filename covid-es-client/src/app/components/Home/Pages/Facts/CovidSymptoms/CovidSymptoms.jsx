import React from 'react'
import useCovidSymptoms from './useCovidSymptoms';
import covid19 from '../../../../../../assets/img/Covid-19.jpg'
import FactsCard from '../FactsCard/FactsCard'
import FactsDialogPopup from './FactsDialog/FactsDialogPopup'

export default function CovidSymptoms() {
    const {
        SetDialogClosed,
        dialogSuccess,
        dialogFailed,
        modalIsOpen,
        confirmLoading,
        setIsOpen,
        AddNewPrecaution,
        setSymptom,
        setVariant,
        variantsList
      } = useCovidSymptoms();

    return (
        <>
            <FactsCard 
                title="New Covid-19 Symptoms" 
                icon={covid19}
                setIsOpen={setIsOpen}
            />

            <FactsDialogPopup
                headerTitle="New Covid-19 Symptoms"
                content={`You are entering data for Covid-19 Symptoms`}
                factType="precautions"
                setFormField={setSymptom}
                modalIsOpen={modalIsOpen}
                setClosed={SetDialogClosed}
                actionOnSubmit={AddNewPrecaution} 
                isLoading={confirmLoading}
                isError={dialogFailed}
                isSuccess={dialogSuccess}
                setVariant={setVariant}
                variantsList={variantsList}
            />
        </>
    )
}
