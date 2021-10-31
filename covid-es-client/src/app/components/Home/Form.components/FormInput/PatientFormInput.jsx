import React from 'react'

export default function PatientFormInput({setFormField, fieldName, fieldType}) {
    return (
        <div className="mb-3">
            <label htmlFor="InputName" className="form-label">{fieldName || ''}</label>
            <input
                className='form-control'
                type={ fieldType || "text"}
                onChange={(e) => {
                    setFormField(e.target.value)
                }}
                required
            />
        </div>
    )
}
