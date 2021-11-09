import React from 'react';
import Modal from 'react-modal';
import SuccessIcon from '../../../../../../assets/success-accept.svg';
import Loading from '../../../Loading.component/Loading.component'
import './FactsDialogPopup.css'
import Dropdown from '../../../Form.components/Dropdown.component/Dropdown.component';

export default function FactsDialogPopup({ headerTitle, content, factType, setFormField, modalIsOpen, setClosed, actionOnSubmit, isLoading, isError, isSuccess, variantsList, setVariant }) {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setClosed()}
            style={{
                content: {
                    display: 'flex',
                    flexDirection: 'column',
                    height: '30rem',
                    width: '20rem',
                    padding: '0rem',
                    border: 'none',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#ffff',
                    boxShadow: '2px 3px 10px #00000048',
                    borderRadius: '.5rem'
                },
                overlay: {
                    backgroundColor: 'rgba(29, 29, 29, .5)'
                }
            }}
        >

            <div className="dialog-modal-header">
                <div>{headerTitle}</div>
                <div onClick={() => setClosed()} className="dialog-close-button" >&times;</div>
            </div>
            <div className="dialog-modal-content">
                {
                    !isError && !isSuccess ? (
                        <div className="dialog-content-entry">
                            <div >
                                <div className="dialog-title">{content}</div>

                                {
                                    factType === "symptom" ? (
                                        <>
                                            <div className="input-group mb-3">
                                                <Dropdown variantsList={variantsList} setVariant={setVariant} />

                                                <div className="input-group-append">
                                                    <label className="input-group-text" htmlFor="dropdown-list">Variant</label>
                                                </div>
                                            </div>

                                            <div className="input-group mb-3">
                                                <select defaultValue="mild" className="custom-select" id="symptomType">
                                                    <option value="mild">Mild</option>
                                                    <option value="severe">Severe</option>
                                                </select>
                                                <div className="input-group-append">
                                                    <label className="input-group-text" htmlFor="symptomType">Type</label>
                                                </div>
                                            </div>
                                        </>
                                    ) : factType === "precaution" && (
                                        <div className="input-group mb-3">
                                            <select defaultValue="long_term" className="custom-select" id="precautionType">
                                                <option value="long_term">Long Term</option>
                                                <option value="short_term">Short Term</option>
                                            </select>
                                            <div className="input-group-append">
                                                <label className="input-group-text" htmlFor="precautionType">Type</label>
                                            </div>
                                        </div>
                                    )
                                }

                                <div className="mb-3 input-fact-container">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Add {factType}</label>
                                    <input
                                        className="form-control"
                                        type={"text"}
                                        name={`${factType}`}
                                        onChange={(e) => {
                                            setFormField(e.target.value)
                                        }}
                                        required
                                        id="factInput"
                                    />
                                    <div id="emailHelp" className="form-text"></div>
                                </div>

                                <div className="form-update-message">
                                    <div className="error-message" id="error-message">
                                        {
                                            `${factType} needed.`
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="dialog-button-container">
                                <button type="button" onClick={() => setClosed()} className="dialog-button dialog-cancel-button">Cancel</button>
                                {
                                    !isLoading ? (
                                        <button type="button" onClick={actionOnSubmit} className="dialog-button dialog-confirm-button">Confirm</button>
                                    ) : (
                                        <div className="button-loading"><Loading height={50} width={50} /></div>
                                    )
                                }
                            </div>
                        </div>
                    ) : !isLoading && isSuccess ? (
                        <>
                            <div className="dialog-title dialog-title-success">
                                <img src={SuccessIcon} alt="success" className="dialog-icon" />
                                <span>Successfully Added Fact !</span>
                            </div>
                            <div className="dialog-button-container dialog-button-container-center">
                                <button type="button" onClick={() => setClosed()} className="dialog-button dialog-confirm-button">Close</button>
                            </div>
                        </>
                    ) : !isLoading && isError && (
                        <>
                            <div className="dialog-title"> <span>Sorry, error when processing request.</span></div>
                            <div className="dialog-button-container dialog-button-container-center">
                                <button type="button" onClick={() => setClosed()} className="dialog-button dialog-failed-button">Close</button>
                            </div>
                        </>
                    )
                }
            </div>

        </Modal>
    )
}
