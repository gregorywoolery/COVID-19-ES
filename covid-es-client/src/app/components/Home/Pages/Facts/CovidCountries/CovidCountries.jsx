import React from 'react'
import FactsCard from '../FactsCard/FactsCard'
import useCovidCountries from './useCovidCountries';
import covidCountries from '../../../../../../assets/img/covid-countries.jpg'
import FactsDialogPopup from './FactsDialog/FactsDialogPopup';

export default function CovidCountries() {
    const {
        SetDialogClosed,
        dialogSuccess,
        dialogFailed,
        modalIsOpen,
        confirmLoading,
        setIsOpen,
        AddNewCountry,
        setCountry
      } = useCovidCountries();

    return (
        <>
            <FactsCard 
                title="Covid Countries" 
                icon={covidCountries}
                setIsOpen={setIsOpen}
            />

            <FactsDialogPopup
                headerTitle="Covid Countries"
                content={`You are entering data for Covid-19 Countries`}
                factType="countries"
                setFormField={setCountry}
                modalIsOpen={modalIsOpen}
                setClosed={SetDialogClosed}
                actionOnSubmit={AddNewCountry} 
                isLoading={confirmLoading}
                isError={dialogFailed}
                isSuccess={dialogSuccess}
            />
        </>
    )


}
