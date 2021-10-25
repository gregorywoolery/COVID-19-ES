import React from 'react'
import covidPrecautions from '../../../../../../assets/img/precautions.jpg'
import useCovidPrecautions from './useCovidPrecautions';
import FactsCard from '../FactsCard/FactsCard'
import FactsDialogPopup from './FactsDialog/FactsDialogPopup'

export default function CovidPrecautions() {
    const {
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
    } = useCovidPrecautions();

    return (
        <>
            <FactsCard 
                title="New Precations" 
                icon={covidPrecautions}
                setIsOpen={setIsOpen}
            />

            <FactsDialogPopup
                headerTitle="New Covid-19 Precautions"
                content={`You are entering data for Covid-19 Precautions`}
                factType="precautions"
                setFormField={setPrecaution}
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

