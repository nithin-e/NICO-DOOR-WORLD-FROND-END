const productValidation = (formData) => {
    const errors = {};
    let isValid = true;

    // Product name validation
    if (!formData.name || formData.name.trim() === '') {
        errors.name = "Product name is required";
        isValid = false;
    }

    // Brand validation
    if (!formData.brand || formData.brand.trim() === '') {
        errors.brand = "Brand name is required";
        isValid = false;
    }

    // Material validation
    if (!formData.material || formData.material.trim() === '') {
        errors.material = "Material name is required";
        isValid = false;
    }

    // Color validation
    if (!formData.color || formData.color.trim() === '') {
        errors.color = "Color name is required";
        isValid = false;
    }

    // Lock included validation
    if (!formData.lockIncluded || formData.lockIncluded.trim() === '') {
        errors.lockIncluded = "Lock included field is required";
        isValid = false;
    } else if (!['yes', 'no', 'YES', 'NO','Yes','No'].includes(formData.lockIncluded.trim())) {
        errors.lockIncluded = "Only 'Yes' or 'No' is allowed";
        isValid = false;
    }

    // Suitable for validation
    if (!formData.suitableFor || formData.suitableFor.trim() === '') {
        errors.suitableFor = "This field is required";
        isValid = false;
    }

    // Description validation
    if (!formData.description || formData.description.trim() === '') {
        errors.description = "This field is required";
        isValid = false;
    }

    // Price validation
    if (!formData.price || formData.price.toString().trim() === '') {
        errors.price = "Price is required";
        isValid = false;
    } else if (isNaN(formData.price)) {
        errors.price = "Enter a valid amount";
        isValid = false;
    } else if (Number(formData.price) < 0) {
        errors.price = "Negative values are not allowed";
        isValid = false;
    }

    // Stock validation
    if (!formData.stock || formData.stock.toString().trim() === '') {
        errors.stock = "Stock is required";
        isValid = false;
    } else if (isNaN(formData.stock)) {
        errors.stock = "Enter a valid quantity";
        isValid = false;
    } else if (Number(formData.stock) < 0) {
        errors.stock = "Negative values are not allowed";
        isValid = false;
    }

    return { isValid, errors };
};

export default productValidation;
