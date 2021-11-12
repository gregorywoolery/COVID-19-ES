import React from 'react'
import './PatientFormInput.css'
export default function PatientFormInput({ setFormField, fieldName, fieldType }) {
    return (
        <div className="mb-3 input-container">
            <label htmlFor="InputName" className="form-label">{fieldName || ''}</label>
            <input
                className='form-control'
                type={fieldType || "text"}
                onChange={(e) => {
                    setFormField(e.target.value)
                }}
                required
            />
            <div className="error-patient-message">{fieldName} Required.</div>
        </div>
    )
}
