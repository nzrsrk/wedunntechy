



export const Validate = (field_name, type, values) => {
    switch (type) {
        case "isEmpty":                  // to check is empty condition
            return validateNULL(field_name, values)
            break;

        case "email":
            return validateEmail(field_name, values)
            break;

        case "password":
            return validatePassword(field_name, values)
            break;

        case "name":
            return validateName(field_name, values)
            break;

        case "mobile":
            return validatePhoneNumber(field_name, values)
            break;

        case "otp":
            return validateOtp(field_name, values)
            break;

        case "ifsc":
            return validateifsc(field_name, values)
            break;

        case "accountNo":
            return validateAccountNo(field_name, values)
            break;

        case "micrcode":
            return validateMicrCode(field_name, values)
            break;

        default:
            break;
    }

}


const validateNULL = (field_name, values) => {
    let errors = {};
    if (!values) {
        errors = field_name + ' is required.';
    }
    else {
        errors = '';
    }
    return errors;
};

const validateEmail = (field_name, values) => {
    let errors = {};
    if (!values) {
        errors = field_name + ' address is required.';
    } else if (!/\S+@\S+\.\S+/.test(values)) {
        errors = field_name + ' address is invalid.';
    }
    else {
        errors = '';
    }
    return errors;
};

const validatePassword = (field_name, values) => {
    let errors = {};
    if (!values) {
        errors = field_name + ' is required.';
    } else if (values.length < 9) {
        errors = field_name + ' is too short.';
    }
    else {
        errors = '';
    }
    return errors;
};
const validateName = (field_name, values) => {
    let errors = {};
    if (!values) {
        errors = field_name + ' is required.';
    }
    // else if (!/^[a-zA-Z]+$/i.test(values)) {
    //     errors = field_name + ' is invalid.';
    // }
    else {
        errors = '';
    }
    return errors;
};

const validatePhoneNumber = (field_name, values) => {
    let errors = {};
    if (!values) {
        errors = field_name + ' is required.';
    } else if (values.length != 10) {
        errors = 'Please check the ' + field_name + '.';
    }
    else if (!/^[0-9]+$/i.test(values)) {
        errors = 'Please check the ' + field_name + '.';
    }
    else {
        errors = '';
    }
    return errors;
};


const validateOtp = (field_name, values) => {
    let errors = {};
    if (!values) {
        errors = field_name + ' Invalid.';
    } else if (values.length != 4) {
        errors = field_name + ' Invalid.';
    }
    else if (!/^[0-9]+$/i.test(values)) {
        errors = field_name + ' Invalid.';
    }
    else {
        errors = '';
    }
    return errors;
};

// The valid IFSC(Indian Financial System) Code must satisfy the following conditions:
// It should be 11 characters long.
// The first four characters should be upper case alphabets.
// The fifth character should be 0.
// The last six characters usually numeric, but can also be alphabetic
const validateifsc = (field_name, values) => {
    let errors = {};
    if (!values) {
        errors = field_name + ' Invalid.';
    }
    else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(values)) {
        errors = field_name + ' Invalid.';
    }
    else {
        errors = '';
    }
    return errors;
};

const validateAccountNo = (field_name, values) => {
    let errors = {};
    if (!values) {
        errors = field_name + ' Invalid.';
    }
    else if (!/^\d{9,18}$/i.test(values)) {
        errors = field_name + ' Invalid.';
    }
    else {
        errors = '';
    }
    return errors;
};

const validateMicrCode = (field_name, values) => {
    let errors = {};
    if (!values) {
        errors = field_name + ' Invalid.';
    }
    else if (!/^\d{9}$/i.test(values)) {
        errors = field_name + ' Invalid.';
    }
    else {
        errors = '';
    }
    return errors;
};