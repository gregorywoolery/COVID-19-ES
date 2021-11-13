
// Custom hook to add event listeners and set selected dropdown option

const useDropdown = (setVariant) => {
    // Sets selected dropdown option
    const dropdownEvent = (event) => {
        var options = event.target.options;
        var selectedIndex = options.selectedIndex;

        for (let i = 0; i < options.length; i++)
            options[i].innerHTML = options[i].value;
        
        setVariant(options[selectedIndex].value);
    }

    // Adds event listener to select list
    const dropdownListener = (variantListSelect) => {
        variantListSelect.addEventListener('change', dropdownEvent);
    }
    // Removes event listener to select list
    const removeDropdownListener = (variantListSelect) => {
        variantListSelect.removeEventListener('change', dropdownEvent);
    }
    
    return {
        dropdownListener,
        removeDropdownListener,
    }
}

export default useDropdown;


