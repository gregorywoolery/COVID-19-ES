

const useDropdown = (setVariant) => {
    const dropdownEvent = (event) => {
        var options = event.target.options;
        var selectedIndex = options.selectedIndex;

        for (let i = 0; i < options.length; i++)
            options[i].innerHTML = options[i].value;
        
        setVariant(options[selectedIndex].value);
    }

    const dropdownListener = (variantListSelect) => {
        variantListSelect.addEventListener('change', dropdownEvent);
    }
    
    const removeDropdownListener = (variantListSelect) => {
        variantListSelect.removeEventListener('change', dropdownEvent);
    }
    
    return {
        dropdownListener,
        removeDropdownListener,
    }
}

export default useDropdown;


