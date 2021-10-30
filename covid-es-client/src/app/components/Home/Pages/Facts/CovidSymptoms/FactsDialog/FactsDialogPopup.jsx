import React from 'react';
import Modal from 'react-modal';
import SuccessIcon from '../../../../../../../assets/success-accept.svg';
import Loading from '../../../../Loading.component/Loading.component'
import './FactsDialogPopup.css'
import Dropdown from '../../../../Form.components/Dropdown.component/Dropdown.component';

export default function FactsDialogPopup({headerTitle, content, factType, setFormField, modalIsOpen, setClosed, actionOnSubmit, isLoading, isError, isSuccess, variantsList, setVariant}) {
    return (
        <Modal 
            isOpen={modalIsOpen}
            onRequestClose={() => setClosed()}
            style={{
                content:{
                    display: 'flex',
                    flexDirection: 'column',
                    height:'30rem',
                    width:'22rem',
                    padding:'0rem',
                    border: 'none',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                },
                overlay:{
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
                            <div>Choose variant</div>
                            <div className="input-group mb-3">
                                <Dropdown variantsList={variantsList} setVariant={setVariant} />

                                <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="dropdown-list">Variant</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Add Symptoms</label>
                                <input
                                    className="form-control" 
                                    type={ "text" }
                                    name={`${factType}`}
                                    onChange={(e) => {
                                        setFormField(e.target.value)
                                    }}
                                    required
                                />
                                <div id="emailHelp" className="form-text"></div>
                            </div>
                            <div className="form-update-message">
                                <div className="error-message">
                                    Has already been added.
                                </div>
                            </div>
                        </div>
                        
                        <div className="dialog-button-container">
                            <button type="button" onClick={() => setClosed()} className="dialog-button dialog-cancel-button">Cancel</button>
                            {
                                !isLoading ? (
                                    <button type="button" onClick={actionOnSubmit} className="dialog-button dialog-confirm-button">Confirm</button>
                                ) : (
                                    <div className="button-loading"><Loading height={50} width={50}/></div>
                                )
                            }
                        </div>
                    </div>
                ) : !isLoading && isSuccess ? ( 
                    <>
                        <div className="dialog-title dialog-title-success">
                            <img src={SuccessIcon} alt="success" className="dialog-icon"/>
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
