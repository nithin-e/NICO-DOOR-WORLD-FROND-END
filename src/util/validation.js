const validateCredentials=(formData)=>{
    const errors = {}
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^\d{8}$/;

    if (!formData.email || formData.email.trim() === "") {

        errors.email = "email is required";
        isValid = false;
    }

    if (!emailRegex.test(formData.email)) {
        errors.email = 'Invalid email format';
        isValid = false;
    }

    if (!formData.password || formData.password.trim() === "") {
        errors.password = 'Password is required';
        isValid = false;
    }

    if (!passwordRegex.test(formData.password)) {
       

        errors.password = 'Password must be at least 8 characters long'
        isValid = false;
    }

    return { isValid, errors };
}
export  default validateCredentials