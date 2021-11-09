import React from 'react'
import './Facts.css'
import addButton from '../../../../../assets/add.svg'
import precautionIcon from '../../../../../assets/precaution-icon.svg'
import symptomIcon from '../../../../../assets/symptom-icon.svg'
import useFacts from './useFacts'
import FactsDialogPopup from './FactsDialogPopup/FactsDialogPopup'


export default function Facts() {
    const {
        showPrecationDialog,
        showSymptomDialog,
        dialogData,
        SetDialogClosed,
        dialogSuccess,
        dialogFailed,
        modalIsOpen,
        confirmLoading,
        variantsList,
        setVariant
    } = useFacts()

    return (
        <>
            <div className="facts-page-container">
                <div className="facts-title">
                    Facts Collection Portal
                </div>
                <div className="facts-body">
                    <p>A solution where new facts can be added on covid symptoms and covid variants.</p>
                    <p>What would you like to add information on?</p>
                </div>
                <div className="slide-container">
                    <div className="slide-single-container">
                        <img src={precautionIcon} className="slide-icon" alt="precautionIcon" />
                        <div className="button-container" onClick={() => showPrecationDialog()}>
                            <div className="button-content">ADD PRECAUTION</div>
                            <img src={addButton} className="addButton" alt="Add_Button" />
                        </div>
                    </div>

                    <div className="slide-single-container" onClick={() => showSymptomDialog()}>
                        <img src={symptomIcon} className="slide-icon" alt="symptomIcon" />
                        <div className="button-container">
                            <div className="button-content">ADD SYMPTOM</div>
                            <img src={addButton} className="addButton" alt="Add_Button" />
                        </div>
                    </div>
                </div>
            </div>

            <FactsDialogPopup
                headerTitle={dialogData.title}
                content={dialogData.content}
                factType={dialogData.factType}

                setFormField={dialogData.setFormField}
                actionOnSubmit={dialogData.actionOnSubmit}

                modalIsOpen={modalIsOpen}
                setClosed={SetDialogClosed}
                isLoading={confirmLoading}
                isError={dialogFailed}
                isSuccess={dialogSuccess}

                setVariant={setVariant}
                variantsList={variantsList}
            />
        </>
    )
}
