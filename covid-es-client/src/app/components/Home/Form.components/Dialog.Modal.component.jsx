import React from 'react';
import Modal from 'react-modal';
import SuccessIcon from '../../../../assets/success-accept.svg';
import Loading from '../Loading.component/Loading.component'
import './DialogModal.css'

export default function DialogModal({modalIsOpen, setClosed, headerTitle, content, actionOnSubmit, isLoading, isError, isSuccess, successMessage}) {
    return (
        <Modal 
            isOpen={modalIsOpen}
            onRequestClose={() => setClosed()}
            style={{
                content:{
                    display: 'flex',
                    flexDirection: 'column',
                    height:'20rem',
                    width:'20rem',
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
                    <>
                        <div className="dialog-question-img"></div>
                        <div className="dialog-title"> <span>{content}</span></div>
                        <div className="dialog-button-container">
                            <button type="button" onClick={() => setClosed()} className="dialog-button dialog-cancel-button">Cancel</button>
                            {
                                !isLoading ? (
                                    <button type="submit" form="profile-form" onSubmit={actionOnSubmit} className="dialog-button dialog-confirm-button">Confirm</button>
                                ) : (
                                    <div className="button-loading"><Loading height={50} width={50}/></div>
                                )
                            }
                        </div>
                    </>
                ) : !isLoading && isSuccess ? ( 
                    <>
                        <div className="dialog-title dialog-title-success">
                            <img src={SuccessIcon} alt="success" className="dialog-icon"/>
                            <span>{successMessage}</span>
                        </div>
                        <div className="dialog-button-container dialog-button-container-center">
                            <button type="button" onClick={() => setClosed()} className="dialog-button dialog-confirm-button">Close</button>
                        </div>
                    </>
                ) : !isLoading && isError ? (
                    <> 
                        <div className="dialog-title"> <span>Sorry, error when processing request.</span></div>
                        <div className="dialog-button-container dialog-button-container-center">
                            <button type="button" onClick={() => setClosed()} className="dialog-button dialog-failed-button">Close</button>
                        </div>
                    </>
                ) : (
                    <div className="dialog-button-container dialog-button-container-center">
                        <button type="button" onClick={() => setClosed()} className="dialog-button dialog-failed-button">Close</button>
                    </div>
                )
            }
            </div>
                    
        </Modal>
    )
}
