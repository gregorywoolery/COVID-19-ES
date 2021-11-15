import React, { useEffect } from 'react'
import useDropdown from './useDropdown'
import './Dropdown.css'


// Displays dropdown list on page
// "useEffect" hook that allows a request to be made to recieve
// list of variants from the api when page finishes loading.
export default function Dropdown({ variantsList, setVariant }) {
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
        <select defaultValue='regular' name="dropdown-list" className="custom-select" id="dropdown-list">
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
