import React, { useEffect } from 'react'
import useDropdown from './useDropdown'
import './Dropdown.css'

export default function Dropdown({variantsList, setVariant}) {
    const {         
        dropdownListener,
        removeDropdownListener,
    } = useDropdown(setVariant);

    useEffect(() => {
        var variantSelect = document.getElementById("dropdown-list");
        dropdownListener(variantSelect);
        return () => {
            removeDropdownListener(variantSelect);
        }

    }, [variantsList])


    return (
        <select defaultValue='1' name="dropdown-list" className="custom-select" id="dropdown-list">
            <option >Choose...</option>
            <option value="all">All</option>
            {
                variantsList && (
                    variantsList.map((variant) => (
                        <option value={variant.Variant} key={variant.Variant}>{variant.Variant}</option>
                    ))
                )

            }
        </select>
    )
}
